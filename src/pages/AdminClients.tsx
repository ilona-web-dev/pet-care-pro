import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { mockClients } from '../../src/data/mockCLients';

export default function AdminClients() {
  return (
    <div>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ borderRadius: 3, width: '100%', overflowX: 'auto' }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockClients.map((client) => (
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
                    <span>{client.notes}</span>
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
            {!mockClients.length && (
              <TableRow>
                <TableCell colSpan={6}>No clients yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
