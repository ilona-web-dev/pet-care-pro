import { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import useVisitsQuery from '../hooks/useVisitsQuery';
import VisitFormDialog from '../components/admin/VisitFormDialog';
import useVetNameMap from '../hooks/useVetNameMap';
import usePetNameMap from '../hooks/usePetNameMap';
import DeleteConfirmDialog from '../components/admin/DeleteConfirmDialog';

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
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteVisitMutation from '../hooks/useDeleteVisitMutation';

export default function AdminVisits() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState<string | null>(null);

  const {
    data: visits = [],
    isPending,
    isError,
    error,
    refetch,
  } = useVisitsQuery();

  const { mutate: deleteVisit, isPending: isDeleting } =
    useDeleteVisitMutation();

  const vetNameById = useVetNameMap();
  const petNameById = usePetNameMap();

  return (
    <div className="space-y-3">
      <AdminHeader
        title="Visit records"
        btnText="Add new visit"
        onAction={() => setDialogOpen(true)}
      />
      <VisitFormDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
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
                      onClick={() => setVisitToDelete(visit.id)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
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
      )}
    </div>
  );
}
