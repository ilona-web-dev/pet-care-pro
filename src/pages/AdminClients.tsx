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
  Typography,
} from '@mui/material';
import AdminHeader from '../components/admin/AdminHeader';
import ClientFormDialog from '../components/admin/ClientFormDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useClientsQuery } from '../hooks/useClientsQuery';
import useDeleteClientMutation from '../hooks/useDeleteClientMutation';
import DeleteConfirmDialog from '../components/admin/DeleteConfirmDialog';

export default function AdminClients() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const { mutate: deleteClient, isPending: isDeleting } =
    useDeleteClientMutation();

  const {
    data: clients = [],
    isPending,
    isError,
    error,
    refetch,
  } = useClientsQuery();

  return (
    <div className="space-y-3">
      <AdminHeader
        title="Client records"
        btnText="Add new client"
        onAction={() => setIsDialogOpen(true)}
      />
      <ClientFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      {isPending && (
        <div className="flex items-center justify-center py-10">
          <CircularProgress size={32} />
        </div>
      )}
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
                <TableCell align="right">Actions</TableCell>
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
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setClientToDelete(client.id)}
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
      )}
    </div>
  );
}
