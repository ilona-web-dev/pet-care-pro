import { useVetsQuery } from '../hooks/useVetsQuery';

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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DeleteConfirmDialog from '../components/admin/DeleteConfirmDialog';
import useDeleteVetMutation from '../hooks/useDeleteVetMutation';

export default function AdminVets() {
  const [vetToDelete, setVetToDelete] = useState<string | null>(null);
  const { mutate: deleteVet, isPending: isDeleting } = useDeleteVetMutation();

  const {
    data: vets = [],
    isPending,
    isError,
    error,
    refetch,
  } = useVetsQuery();

  return (
    <div className="space-y-3">
      <AdminHeader title="Vet records" />

      {isPending && (
        <div className="flex items-center justify-center py-10">
          <CircularProgress size={32} />
        </div>
      )}

      <DeleteConfirmDialog
        open={!!vetToDelete}
        title="Delete vet"
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        onConfirm={() => {
          if (vetToDelete) {
            deleteVet(vetToDelete, {
              onSettled: () => setVetToDelete(null),
            });
          }
        }}
        onCancel={() => setVetToDelete(null)}
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
          Failed to load vets. {error?.message}
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
                <TableCell>Vet name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Years of experience</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vets.map((vet) => (
                <TableRow key={vet.id}>
                  <TableCell>
                    <p className="font-semibold">{vet.fullName}</p>
                  </TableCell>
                  <TableCell>{vet.role}</TableCell>
                  <TableCell>{vet.yearsExperience}</TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setVetToDelete(vet.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {!isPending && !vets.length && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body2" color="text.secondary">
                      No vets yet.
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
