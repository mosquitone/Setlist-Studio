'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import { Button } from '@/components/common/ui/Button';
import { Song } from '../../types/graphql';
import { useI18n } from '@/hooks/useI18n';

interface SongEditDialogProps {
  open: boolean;
  song: Song | null;
  onClose: () => void;
  onSave: (songData: Omit<Song, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  loading?: boolean;
}

export function SongEditDialog({
  open,
  song,
  onClose,
  onSave,
  loading = false,
}: SongEditDialogProps) {
  const { messages } = useI18n();
  const [formValues, setFormValues] = useState<Omit<Song, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    artist: '',
    key: '',
    tempo: null,
    duration: null,
    notes: '',
  });
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (song) {
      setFormValues({
        title: song.title ?? '',
        artist: song.artist ?? '',
        key: song.key ?? '',
        tempo: song.tempo ?? null,
        duration: song.duration ?? null,
        notes: song.notes ?? '',
      });
    }
  }, [song]);

  useEffect(() => {
    if (open && titleRef.current) {
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [open]);

  const handleFieldChange = (field: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: field === 'tempo' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  const handleSave = async () => {
    await onSave(formValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{messages.songs.form.editTitle}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            ref={titleRef}
            label={messages.songs.form.titleLabel}
            value={formValues.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label={messages.songs.form.artistLabel}
            value={formValues.artist}
            onChange={(e) => handleFieldChange('artist', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label={messages.songs.form.keyLabel}
            value={formValues.key || ''}
            onChange={(e) => handleFieldChange('key', e.target.value)}
            fullWidth
          />
          <TextField
            label={messages.songs.form.tempoLabel}
            type="number"
            value={formValues.tempo || ''}
            onChange={(e) => handleFieldChange('tempo', e.target.value)}
            fullWidth
          />
          <TextField
            label={messages.songs.form.notesLabel}
            value={formValues.notes || ''}
            onChange={(e) => handleFieldChange('notes', e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          {messages.common.cancel}
        </Button>
        <Button onClick={handleSave} loading={loading}>
          {messages.common.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
