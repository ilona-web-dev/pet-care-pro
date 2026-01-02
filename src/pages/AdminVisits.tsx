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
} from '@mui/material';
import AdminHeader from '../components/admin/AdminHeader';
import useVisitsQuery from '../hooks/useVisitsQuery';

export default function AdminVisits() {
  const {
    data: visits = [],
    isPending,
    isError,
    error,
    refetch,
  } = useVisitsQuery();

  return (
    <div className="space-y-3">
      <AdminHeader
        title="Visit records"
        btnText="Add new visit"
        onAction={() => alert('Visit form coming soon')}
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
                <TableCell>Invoice</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {new Date(visit.visitDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-500">
                      ID: {visit.petId.slice(0, 8)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-500">
                      ID: {visit.vetId.slice(0, 8)}
                    </span>
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
                </TableRow>
              ))}
              {!visits.length && (
                <TableRow>
                  <TableCell colSpan={8}>
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
