import { useState } from 'react';
import {
  Alert,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AdminHeader from '../components/admin/AdminHeader';
import ClientFormDialog from '../components/admin/ClientFormDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useClientsQuery } from '../hooks/useClientsQuery';
import useDeleteClientMutation from '../hooks/useDeleteClientMutation';
import DeleteConfirmDialog from '../components/admin/DeleteConfirmDialog';
import type { Client, ClientSort } from '../types/admin';
import Pagination from '../components/shared/Pagination';
import { useNavigate } from 'react-router-dom';
import useUserRoleQuery from '../hooks/useUserRoleQuery';
import useAuthSession from '../hooks/useAuthSession';

export default function AdminClients() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const search = searchInput.length >= 2 ? searchInput : '';
  const [sort, setSort] = useState<ClientSort>('name-asc');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const { mutate: deleteClient, isPending: isDeleting } =
    useDeleteClientMutation();

  const { data, isPending, isError, error, refetch } = useClientsQuery({
    page,
    rowsPerPage,
    search,
    sort,
  });

  const clients = data?.data ?? [];
  const total = data?.count ?? 0;
  const totalPages = Math.ceil(total / rowsPerPage);

  const navigate = useNavigate();

  const { userId, isLoading: isSessionLoading } = useAuthSession();
  const { data: roleData, isLoading: isRoleLoading } = useUserRoleQuery(
    userId ?? undefined,
  );
  const isRoleReady = !isSessionLoading && !isRoleLoading;
  const canManage = isRoleReady && roleData === 'admin';

  return (
    <div className="space-y-3">
      <AdminHeader
        title="Client records"
        btnText="Add new client"
        onAction={() => {
          setEditingClient(null);
          setIsDialogOpen(true);
        }}
        actionDisabled={!canManage}
        role={roleData}
      />

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex flex-wrap gap-4">
          <TextField
            size="small"
            label="Search clients"
            value={searchInput}
            onChange={(event) => {
              setPage(0);
              setSearchInput(event.target.value);
            }}
            sx={{
              flex: '1 1 220px',
              minWidth: 200,
              '& .MuiInputBase-root': {
                height: 36,
                fontSize: 13,
              },
              '& .MuiInputLabel-root': {
                fontSize: 13,
              },
            }}
          />

          <FormControl
            size="small"
            sx={{
              flex: '1 1 220px',
              minWidth: 200,
              '& .MuiInputBase-root': {
                height: 36,
                fontSize: 13,
              },
              '& .MuiInputLabel-root': {
                fontSize: 13,
              },
            }}
          >
            <InputLabel id="clients-sort-label">Sort by</InputLabel>
            <Select
              labelId="clients-sort-label"
              value={sort}
              label="Sort by"
              onChange={(event) => {
                setPage(0);
                setSort(
                  event.target.value as
                    | 'name-asc'
                    | 'name-desc'
                    | 'created-desc'
                    | 'created-asc',
                );
              }}
            >
              <MenuItem value="name-asc">Name A → Z</MenuItem>
              <MenuItem value="name-desc">Name Z → A</MenuItem>
              <MenuItem value="created-desc">Newest first</MenuItem>
              <MenuItem value="created-asc">Oldest first</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {isPending && (
        <div className="flex items-center justify-center py-10">
          <CircularProgress size={32} />
        </div>
      )}

      <ClientFormDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingClient(null);
        }}
        initialValues={editingClient}
      />

      <DeleteConfirmDialog
        open={!!clientToDelete}
        title="Delete client"
        message="This action cannot be undone."
        confirmLabel={isDeleting ? 'Deleting…' : 'Delete'}
        onConfirm={() => {
          if (clientToDelete) {
            deleteClient(clientToDelete, {
              onSettled: () => setClientToDelete(null),
            });
          }
        }}
        onCancel={() => setClientToDelete(null)}
      />

      {isError && (
        <Alert
          severity="error"
          action={
            <button
              type="button"
              className="text-sm font-semibold text-blue-600 underline"
              onClick={() => refetch()}
            >
              Try again
            </button>
          }
        >
          Failed to load clients. {error?.message}
        </Alert>
      )}

      {!isPending && !isError && (
        <>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 3,
              width: '100%',
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    '& .MuiTableCell-root': {
                      fontWeight: 600,
                      color: 'text.primary',
                    },
                  }}
                >
                  <TableCell>Client</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">
                          {client.fullName.slice(0, 1)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {client.fullName}
                          </p>
                          <p className="text-xs text-slate-500">
                            ID: {client.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {client.phone}
                    </TableCell>
                    <TableCell>{client.address ?? '-'}</TableCell>
                    <TableCell>
                      {client.notes ? (
                        <span className="text-xs text-slate-600">
                          {client.notes}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                      <IconButton
                        aria-label="View client"
                        color="info"
                        onClick={() => navigate(`/admin/clients/${client.id}`)}
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setEditingClient(client);
                          setIsDialogOpen(true);
                        }}
                        disabled={!canManage}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setClientToDelete(client.id)}
                        disabled={!canManage}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {!isPending && !clients.length && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography variant="body2" color="text.secondary">
                        No clients yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-between">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
