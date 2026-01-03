import { useMemo, useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import { usePetsQuery } from '../hooks/usePetsQuery';
import { useClientsQuery } from '../hooks/useClientsQuery';
import {
  Alert,
  Paper,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetFormDialog from '../components/admin/PetFormDialog';

export default function AdminPets() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const {
    data: pets = [],
    isPending,
    isError,
    error,
    refetch,
  } = usePetsQuery();

  const { data: clients = [] } = useClientsQuery();
  const ownersById = useMemo(
    () =>
      clients.reduce<Record<string, string>>((acc, client) => {
        acc[client.id] = client.fullName;
        return acc;
      }, {}),
    [clients],
  );

  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <AdminHeader
        title="Pet records"
        btnText="Add new pet"
        onAction={() => setDialogOpen(true)}
      />

      <PetFormDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
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
          Failed to load pets. {error?.message}
        </Alert>
      )}

      {isPending && (
        <div className="flex items-center justify-center py-10">
          <CircularProgress size={32} />
        </div>
      )}

      {!isPending && !isError && (
        <div className="-mx-4 overflow-x-auto px-4">
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 3,
              width: '100%',
              minWidth: 0,
            }}
          >
            <Table sx={{ maxWidth: '100%' }}>
              <TableHead>
                <TableRow
                  sx={{
                    '& .MuiTableCell-root': {
                      fontWeight: 600,
                      color: 'text.primary',
                    },
                  }}
                >
                  <TableCell>Owner</TableCell>
                  <TableCell>Pet</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Breed</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Microchip</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell>
                      {ownersById[pet.ownerId] ? (
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800">
                            {ownersById[pet.ownerId]}
                          </span>
                          <span className="text-xs text-slate-500">
                            ID: {pet.ownerId.slice(0, 8)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500">
                          ID: {pet.ownerId.slice(0, 8)}
                        </span>
                      )}
                    </TableCell>

                    <TableCell>{pet.name}</TableCell>
                    <TableCell>{pet.birthDate}</TableCell>
                    <TableCell>{pet.species}</TableCell>
                    <TableCell>{pet.breed ?? '-'}</TableCell>
                    <TableCell>{pet.sex}</TableCell>
                    <TableCell>{pet.microchip ?? '-'}</TableCell>
                    <TableCell>{pet.weightKg + 'kg'}</TableCell>
                    <TableCell>
                      {pet.notes ? (
                        <span className="text-xs text-slate-600">
                          {pet.notes}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {!isPending && !pets.length && (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <Typography variant="body2" color="text.secondary">
                        No pets yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
