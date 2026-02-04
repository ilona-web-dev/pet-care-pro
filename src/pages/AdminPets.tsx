import { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import { usePetsQuery } from '../hooks/usePetsQuery';
import { useNavigate } from 'react-router';

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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PetFormDialog from '../components/admin/PetFormDialog';
import useOwnerNameMap from '../hooks/useOwnerNameMap';
import DeleteConfirmDialog from '../components/admin/DeleteConfirmDialog';
import useDeletePetMutation from '../hooks/useDeletePetMutation';
import type { Pet, PetSort } from '../types/admin';
import Pagination from '../components/shared/Pagination';

export default function AdminPets() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [petToDelete, setPetToDelele] = useState<string | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const [searchInput, setSearchInput] = useState('');
  const search = searchInput.length >= 2 ? searchInput : '';

  const [sort, setSort] = useState<PetSort>('name-asc');

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const { mutate: deletePet, isPending: isDeleting } = useDeletePetMutation();

  const { data, isPending, isError, error, refetch } = usePetsQuery({
    page,
    rowsPerPage,
    search,
    sort,
  });

  const pets = data?.data ?? [];
  const total = data?.count ?? 0;
  const totalPages = Math.ceil(total / rowsPerPage);

  // Returns a memoized map of client ID -> full name for quick lookups
  const ownerNameById = useOwnerNameMap();
  const navigate = useNavigate();

  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <AdminHeader
        title="Pet records"
        btnText="Add new pet"
        onAction={() => {
          setEditingPet(null);
          setDialogOpen(true);
        }}
      />

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex flex-wrap gap-4">
          <TextField
            size="small"
            label="Search pets by name, species or breed"
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
            <InputLabel id="pets-sort-label">Sort by</InputLabel>
            <Select
              labelId="pets-sort-label"
              value={sort}
              label="Sort by"
              onChange={(event) => {
                setPage(0);
                setSort(event.target.value as PetSort);
              }}
            >
              <MenuItem value="name-asc">Pet's name A → Z</MenuItem>
              <MenuItem value="name-desc">Pet's name Z → A</MenuItem>
              <MenuItem value="created-desc">Newest first</MenuItem>
              <MenuItem value="created-asc">Oldest first</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <PetFormDialog
        open={isDialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingPet(null);
        }}
        initialValues={editingPet}
      />

      <DeleteConfirmDialog
        open={!!petToDelete}
        title="Delete pet"
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        onConfirm={() => {
          if (petToDelete) {
            deletePet(petToDelete, {
              onSettled: () => setPetToDelele(null),
            });
          }
        }}
        onCancel={() => setPetToDelele(null)}
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
                      {ownerNameById[pet.ownerId] ? (
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800">
                            {ownerNameById[pet.ownerId]}
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
                    <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                      <IconButton
                        aria-label="View pet"
                        onClick={() => navigate(`/admin/pets/${pet.id}`)}
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setEditingPet(pet);
                          setDialogOpen(true);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setPetToDelele(pet.id)}
                      >
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

          {totalPages > 1 && (
            <div className="mt-4 flex justify-between">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
