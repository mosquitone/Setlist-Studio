'use client';

import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SETLIST, GET_SETLIST, GET_SETLISTS } from '@/lib/server/graphql/apollo-operations';
import { useRouter, useSearchParams } from 'next/navigation';
import SetlistForm from '@/components/forms/SetlistForm';
import { SetlistFormValues } from '@/types/components';
import { GetSetlistResponse, SetlistItem } from '@/types/graphql';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function NewSetlistPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const duplicateId = searchParams.get('duplicate');
  const selectedSongsParam = searchParams.get('selectedSongs');
  const [initialValues, setInitialValues] = useState<SetlistFormValues>({
    title: '',
    bandName: '',
    eventName: '',
    eventDate: '',
    openTime: '',
    startTime: '',
    theme: 'black',
    items: [{ title: '', note: '' }],
  });

  const [createSetlist, { loading, error }] = useMutation(CREATE_SETLIST, {
    refetchQueries: [{ query: GET_SETLISTS }],
    awaitRefetchQueries: true,
  });

  const { data: duplicateData, loading: duplicateLoading } = useQuery<GetSetlistResponse>(
    GET_SETLIST,
    {
      variables: { id: duplicateId },
      skip: !duplicateId,
    },
  );

  const handleSubmit = async (values: SetlistFormValues) => {
    const { data } = await createSetlist({
      variables: {
        input: {
          title: values.title,
          bandName: values.bandName,
          eventName: values.eventName || undefined,
          eventDate: values.eventDate || undefined,
          openTime: values.openTime || undefined,
          startTime: values.startTime || undefined,
          theme: values.theme,
          items: values.items.map((item, index) => ({
            title: item.title,
            note: item.note || undefined,
            order: index,
          })),
        },
      },
    });

    if (data?.createSetlist) {
      router.push(`/setlists/${data.createSetlist.id}`);
    }
  };

  useEffect(() => {
    if (duplicateData?.setlist) {
      const setlist = duplicateData.setlist;
      setInitialValues({
        title: `${setlist.title} (コピー)`,
        bandName: setlist.bandName || '',
        eventName: setlist.eventName || '',
        eventDate: setlist.eventDate || '',
        openTime: setlist.openTime || '',
        startTime: setlist.startTime || '',
        theme: setlist.theme || 'white',
        items:
          setlist.items.length > 0
            ? [...setlist.items]
                .sort((a: SetlistItem, b: SetlistItem) => a.order - b.order)
                .map((item: SetlistItem) => ({
                  title: item.title,
                  note: item.note || '',
                }))
            : [{ title: '', note: '' }],
      });
    } else if (selectedSongsParam) {
      try {
        const selectedSongs: unknown = JSON.parse(selectedSongsParam);
        if (Array.isArray(selectedSongs) && selectedSongs.length > 0) {
          setInitialValues((prev) => ({
            ...prev,
            items: selectedSongs.slice(0, 20), // 20曲制限
          }));
        }
      } catch (error: unknown) {
        console.error('Failed to parse selected songs:', error);
      }
    }
  }, [duplicateData, selectedSongsParam]);

  const createError = error
    ? new Error(`セットリストの作成に失敗しました: ${error.message}`)
    : null;
  const isLoading = loading || duplicateLoading;

  return (
    <ProtectedRoute>
      <SetlistForm
        title={
          duplicateId
            ? 'セットリストを複製'
            : selectedSongsParam
              ? '選択した楽曲でセットリストを作成'
              : '新しいセットリストを作成'
        }
        initialValues={initialValues}
        onSubmit={handleSubmit}
        loading={isLoading}
        error={createError}
        submitButtonText="セットリストを作成"
        enableDragAndDrop={true}
      />
    </ProtectedRoute>
  );
}
