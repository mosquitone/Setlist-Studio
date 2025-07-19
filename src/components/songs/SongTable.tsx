'use client';

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Chip,
  Checkbox,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Song } from '../../types/graphql';
import { useI18n } from '@/hooks/useI18n';

interface SongTableProps {
  songs: Song[];
  loading: boolean;
  onEdit: (song: Song) => void;
  onDelete: (song: Song) => void;
  selectedSongs: string[];
  onToggleSelection: (songId: string) => void;
  onSelectAll: (selected: boolean) => void;
}

export function SongTable({
  songs,
  loading,
  onEdit,
  onDelete,
  selectedSongs,
  onToggleSelection,
  onSelectAll,
}: SongTableProps) {
  const { messages } = useI18n();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isAllSelected = songs.length > 0 && selectedSongs.length === songs.length;
  const isSomeSelected = selectedSongs.length > 0 && selectedSongs.length < songs.length;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!songs.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          {messages.songs.empty.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {messages.songs.empty.description}
        </Typography>
      </Box>
    );
  }

  // モバイル版: カード表示
  if (isMobile) {
    return (
      <Stack spacing={2}>
        {songs.map((song) => (
          <Card
            key={song.id}
            sx={{
              '&:hover': { backgroundColor: 'action.hover' },
              cursor: 'pointer',
            }}
            onClick={() => onEdit(song)}
          >
            <CardContent>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Checkbox
                      checked={selectedSongs.includes(song.id)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.stopPropagation();
                        onToggleSelection(song.id);
                      }}
                      size="small"
                      aria-label={`${song.title}${messages.songs.table.selectSong}`}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="h6" component="h3" noWrap>
                        {song.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {song.artist}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onEdit(song);
                      }}
                      color="primary"
                      size="small"
                      aria-label={`${song.title}${messages.songs.table.editSong}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onDelete(song);
                      }}
                      color="error"
                      size="small"
                      aria-label={`${song.title}${messages.songs.table.deleteSong}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {song.key && (
                    <Chip
                      label={`${messages.songs.chips.keyPrefix}${song.key}`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {song.tempo && (
                    <Chip
                      label={`${messages.songs.chips.tempoPrefix}${song.tempo}`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Stack>

                {song.notes && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {song.notes}
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  // デスクトップ版: テーブル表示
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={isAllSelected}
                indeterminate={isSomeSelected}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSelectAll(e.target.checked)}
                aria-label={messages.songs.table.selectAll}
              />
            </TableCell>
            <TableCell>{messages.songs.table.title}</TableCell>
            <TableCell>{messages.songs.table.artist}</TableCell>
            <TableCell>{messages.songs.table.key}</TableCell>
            <TableCell>{messages.songs.table.tempo}</TableCell>
            <TableCell>{messages.songs.table.notes}</TableCell>
            <TableCell align="right">{messages.songs.table.actions}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song) => (
            <TableRow
              key={song.id}
              hover
              tabIndex={0}
              sx={{
                '&:focus': {
                  backgroundColor: 'action.focus',
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '-2px',
                },
              }}
              onKeyDown={(event: React.KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onEdit(song);
                } else if (event.key === 'Delete') {
                  event.preventDefault();
                  onDelete(song);
                }
              }}
              aria-label={`${messages.songs.table.title}: ${song.title}。Enter${messages.songs.table.editSong}、Delete${messages.songs.table.deleteSong}`}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedSongs.includes(song.id)}
                  onChange={() => onToggleSelection(song.id)}
                  aria-label={`${song.title}${messages.songs.table.selectSong}`}
                />
              </TableCell>
              <TableCell>{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.key || '-'}</TableCell>
              <TableCell>{song.tempo || '-'}</TableCell>
              <TableCell>{song.notes || '-'}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => onEdit(song)}
                  color="primary"
                  size="small"
                  aria-label={`${song.title}${messages.songs.table.editSong}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(song)}
                  color="error"
                  size="small"
                  aria-label={`${song.title}${messages.songs.table.deleteSong}`}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
