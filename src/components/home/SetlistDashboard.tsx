'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  Chip,
  Stack,
  IconButton,
  CardActionArea,
} from '@mui/material';
import { Button } from '@/components/common/ui/Button';
import { DeleteConfirmModal } from '@/components/common/DeleteConfirmModal';
import {
  PlaylistPlay as PlaylistPlayIcon,
  Add as AddIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Group as GroupIcon,
  Edit as EditIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { DELETE_SETLIST, GET_SETLISTS } from '@/lib/server/graphql/apollo-operations';
import { Setlist } from '../../types/graphql';
import { useI18n } from '@/hooks/useI18n';

interface SetlistDashboardProps {
  setlistsData: { setlists: Setlist[] } | undefined;
  setlistsLoading: boolean;
}

export function SetlistDashboard({ setlistsData, setlistsLoading }: SetlistDashboardProps) {
  const { messages, lang } = useI18n();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [setlistToDelete, setSetlistToDelete] = useState<Setlist | null>(null);

  const [deleteSetlist, { loading: deleteLoading }] = useMutation(DELETE_SETLIST, {
    refetchQueries: [{ query: GET_SETLISTS }],
    onCompleted: () => {
      setDeleteDialogOpen(false);
      setSetlistToDelete(null);
    },
  });

  const handleDeleteClick = (setlist: Setlist, event: React.MouseEvent) => {
    event.stopPropagation();
    setSetlistToDelete(setlist);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (setlistToDelete) {
      try {
        await deleteSetlist({ variables: { id: setlistToDelete.id } });
      } catch (error) {
        console.error('Failed to delete setlist:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSetlistToDelete(null);
  };
  if (setlistsLoading) {
    return (
      <Box>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          {messages.pages.home.dashboard.title}
        </Typography>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {messages.pages.home.dashboard.loading}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!setlistsData?.setlists?.length) {
    return (
      <Box>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          {messages.pages.home.dashboard.title}
        </Typography>
        <Card sx={{ p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <PlaylistPlayIcon sx={{ fontSize: 64, color: 'grey.400', mb: 3 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            {messages.pages.home.dashboard.empty.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {messages.pages.home.dashboard.empty.description}
          </Typography>
          <Button
            component={Link}
            href="/setlists/new"
            startIcon={<AddIcon />}
            size="large"
            sx={{ borderRadius: 3 }}
          >
            {messages.pages.home.dashboard.empty.createButton}
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        {messages.pages.home.dashboard.title}
      </Typography>
      <Grid container spacing={2}>
        {setlistsData.setlists.map((setlist: Setlist) => (
          <Grid item xs={12} sm={6} md={4} key={setlist.id}>
            <Card
              sx={{
                height: 278,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                },
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <CardActionArea
                component={Link}
                href={`/setlists/${setlist.id}`}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${
                      setlist.theme === 'white'
                        ? '#f8fafc 0%, #e2e8f0 100%'
                        : '#1e293b 0%, #0f172a 100%'
                    })`,
                    p: 1.5,
                    color: setlist.theme === 'white' ? 'text.primary' : 'white',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1.5,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: setlist.theme === 'white' ? 'primary.main' : 'secondary.main',
                        width: 40,
                        height: 40,
                      }}
                    >
                      <PlaylistPlayIcon />
                    </Avatar>
                    <Stack direction="row" spacing={0.5}>
                      <Chip
                        icon={setlist.isPublic ? <PublicIcon /> : <LockIcon />}
                        label={
                          setlist.isPublic
                            ? messages.pages.home.dashboard.public
                            : messages.pages.home.dashboard.private
                        }
                        size="small"
                        sx={{
                          bgcolor: setlist.isPublic
                            ? 'rgba(34, 197, 94, 0.1)'
                            : 'rgba(156, 163, 175, 0.1)',
                          color: setlist.isPublic ? '#16a34a' : '#6b7280',
                          fontWeight: 600,
                          '& .MuiChip-icon': {
                            fontSize: '0.8rem',
                          },
                        }}
                      />
                      <Chip
                        label={
                          setlist.theme === 'white'
                            ? messages.pages.home.dashboard.white
                            : messages.pages.home.dashboard.black
                        }
                        size="small"
                        sx={{
                          bgcolor:
                            setlist.theme === 'white'
                              ? 'rgba(59, 130, 246, 0.1)'
                              : 'rgba(239, 68, 68, 0.2)',
                          color: setlist.theme === 'white' ? 'primary.main' : '#ef4444',
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                      fontSize: '1.1rem',
                      lineHeight: 1.3,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {setlist.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    {setlist.bandName && (
                      <>
                        <GroupIcon sx={{ fontSize: 14 }} />
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.75rem',
                            opacity: 0.8,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100px',
                          }}
                        >
                          {setlist.bandName}
                        </Typography>
                      </>
                    )}
                    {setlist.eventName && (
                      <>
                        <EventIcon sx={{ fontSize: 14, ml: setlist.bandName ? 1 : 0 }} />
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.75rem',
                            opacity: 0.8,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100px',
                          }}
                        >
                          {setlist.eventName}
                        </Typography>
                      </>
                    )}
                  </Box>
                  {setlist.eventDate && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <ScheduleIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>
                        {new Date(setlist.eventDate).toLocaleDateString(
                          lang === 'ja' ? 'ja-JP' : 'en-US',
                        )}
                      </Typography>
                    </Box>
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.8rem',
                      opacity: 0.7,
                      mt: 'auto',
                      mb: 1,
                    }}
                  >
                    {setlist.items.length} {messages.pages.home.dashboard.songsCount}
                  </Typography>
                </Box>
              </CardActionArea>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: 'background.paper',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Button
                  component={Link}
                  href={`/setlists/${setlist.id}/edit`}
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{
                    borderRadius: 3,
                    fontSize: '0.75rem',
                    py: 0.75,
                    px: 2,
                    textTransform: 'none',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    bgcolor: 'transparent',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                    },
                    fontWeight: 600,
                    minWidth: 80,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {messages.pages.home.dashboard.edit}
                </Button>
                <IconButton
                  onClick={(e) => handleDeleteClick(setlist, e)}
                  disabled={deleteLoading}
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: 'error.lighter',
                      color: 'error.dark',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <DeleteConfirmModal
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={messages.pages.home.dashboard.delete.title}
        itemName={setlistToDelete?.title || ''}
        itemType={messages.pages.home.dashboard.delete.itemType}
        loading={deleteLoading}
      />
    </Box>
  );
}
