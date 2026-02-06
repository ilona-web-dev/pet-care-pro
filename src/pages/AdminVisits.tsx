import { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import useVisitsQuery from '../hooks/useVisitsQuery';
import useVetNameMap from '../hooks/useVetNameMap';
import usePetNameMap from '../hooks/usePetNameMap';
import DeleteConfirmDialog from '../components/admin/DeleteConfirmDialog';
import VisitFormDialog from '../components/admin/VisitFormDialog';
import Pagination from '../components/shared/Pagination';
import useUserRoleQuery from '../hooks/useUserRoleQuery';
import useAuthSession from '../hooks/useAuthSession';

import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteVisitMutation from '../hooks/useDeleteVisitMutation';
import type { Visit, VisitReason, VisitStatus } from '../types/admin';
import type { VisitsSortByDate } from '../types/admin';

export default function AdminVisits() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState<string | null>(null);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);
  const [sortByDate, setSortByDate] = useState<VisitsSortByDate>('date-asc');
  const [filterByReason, setFilterByReason] = useState<VisitReason | 'all'>(
    'all',
  );
  const [sortByStatus, setSortByStatus] = useState<VisitStatus | 'all'>('all');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const { data, isPending, isError, error, refetch } = useVisitsQuery({
    page,
    rowsPerPage,
    sort: sortByDate,
    reason: filterByReason,
    status: sortByStatus,
  });

  const visits = data?.data ?? [];
  const total = data?.count ?? 0;
  const totalPages = Math.ceil(total / rowsPerPage);

  const { mutate: deleteVisit, isPending: isDeleting } =
    useDeleteVisitMutation();

  const vetNameById = useVetNameMap();
  const petNameById = usePetNameMap();

  const { userId, isLoading: isSessionLoading } = useAuthSession();
  const { data: roleData, isLoading: isRoleLoading } = useUserRoleQuery(
    userId ?? undefined,
  );
  const isRoleReady = !isSessionLoading && !isRoleLoading;
  const canManage = isRoleReady && roleData === 'admin';

  return (
    <div className="space-y-3">
      <AdminHeader
        title="Visit records"
        btnText="Add new visit"
        onAction={() => {
          setEditingVisit(null);
          setIsDialogOpen(true);
        }}
        actionDisabled={!canManage}
        role={roleData}
      />

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex flex-wrap gap-4">
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
            <InputLabel id="visits-sortByDate-label">Sort by date</InputLabel>
            <Select
              labelId="visits-sortByDate-label"
              value={sortByDate}
              label="Sort by date"
              onChange={(event) => {
                setPage(0);
                setSortByDate(event.target.value as VisitsSortByDate);
              }}
            >
              <MenuItem value="date-desc">Newest visits</MenuItem>
              <MenuItem value="date-asc">Oldest visits</MenuItem>
            </Select>
          </FormControl>
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
            <InputLabel id="visits-filterByReason-label">
              Sort by reason
            </InputLabel>
            <Select
              labelId="visits-filterByReason-label"
              value={filterByReason}
              label="Filter by reason"
              onChange={(event) => {
                setPage(0);
                setFilterByReason(event.target.value as VisitReason);
              }}
            >
              <MenuItem value="all">All reasons</MenuItem>
              <MenuItem value="routine_checkup">Routine Checkup</MenuItem>
              <MenuItem value="vaccination">Vaccination</MenuItem>
              <MenuItem value="follow_up">Follow-up</MenuItem>
              <MenuItem value="grooming">Grooming</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
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
            <InputLabel id="visits-sortByStatus-label">
              Sort by status
            </InputLabel>
            <Select
              labelId="visits-sortByStatus-label"
              value={sortByStatus}
              label="Sort by status"
              onChange={(event) => {
                setPage(0);
                setSortByStatus(event.target.value as VisitStatus);
              }}
            >
              <MenuItem value="all">All statuses</MenuItem>
              <MenuItem value="planned">Planned</MenuItem>
              <MenuItem value="in_progress">In progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <VisitFormDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingVisit(null);
        }}
        initialValues={editingVisit}
      />

      <DeleteConfirmDialog
        open={!!visitToDelete}
        title="Delete visit"
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        onConfirm={() => {
          if (visitToDelete) {
            deleteVisit(visitToDelete, {
              onSettled: () => setVisitToDelete(null),
            });
          }
        }}
        onCancel={() => {
          setVisitToDelete(null);
        }}
      />

      {isPending && (
        <div className="flex items-center justify-center py-10">
          <CircularProgress size={32} />
        </div>
      )}

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
          Failed to load visits. {error?.message}
        </Alert>
      )}

      {!isPending && !isError && (
        <>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: 3, width: '100%', overflowX: 'auto' }}
          >
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow
                  sx={{
                    '& .MuiTableCell-root': {
                      fontWeight: 600,
                      color: 'text.primary',
                    },
                  }}
                >
                  <TableCell>Date</TableCell>
                  <TableCell>Pet</TableCell>
                  <TableCell>Vet</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Diagnosis</TableCell>
                  <TableCell>Treatment</TableCell>
                  <TableCell>Invoice</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visits.map((visit) => (
                  <TableRow key={visit.id}>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {new Date(visit.visitDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">
                          {petNameById[visit.petId] ?? 'Unknown pet'}
                        </span>
                        <span className="text-xs text-slate-500">
                          ID: {visit.petId.slice(0, 8)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">
                          {vetNameById[visit.vetId] ?? 'Unknown vet'}
                        </span>
                        <span className="text-xs text-slate-500">
                          ID: {visit.vetId.slice(0, 8)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {visit.reason.replace('_', ' ')}
                    </TableCell>
                    <TableCell>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                        {visit.status.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell>{visit.diagnosis ?? '—'}</TableCell>
                    <TableCell>{visit.treatment ?? '—'}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      {visit.invoiceAmount ? `€${visit.invoiceAmount}` : '—'}
                    </TableCell>
                    <TableCell>
                      {visit.notes ? (
                        <span className="text-xs text-slate-600">
                          {visit.notes}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setEditingVisit(visit);
                          setIsDialogOpen(true);
                        }}
                        disabled={!canManage}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setVisitToDelete(visit.id)}
                        disabled={!canManage}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {!visits.length && (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <Typography variant="body2" color="text.secondary">
                        No visits yet.
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
