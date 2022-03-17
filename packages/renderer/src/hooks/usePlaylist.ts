import { fetchPlaylist } from '@/api/playlist'
import { PlaylistApiNames } from '@/api/playlist'
import type { FetchPlaylistParams } from '@/api/playlist'
import reactQueryClient from '@/utils/reactQueryClient'

const fetch = (params: FetchPlaylistParams, noCache?: boolean) => {
  return fetchPlaylist(params, !!noCache)
}

export default function usePlaylist(
  params: FetchPlaylistParams,
  noCache?: boolean
) {
  return useQuery(
    [PlaylistApiNames.FETCH_PLAYLIST, params],
    () => fetch(params, noCache),
    {
      enabled: !!(params.id && params.id > 0 && !isNaN(Number(params.id))),
      staleTime: 3600000,
    }
  )
}

export async function prefetchPlaylist(params: FetchPlaylistParams) {
  console.log('prefetchAlbum', params)
  await reactQueryClient.prefetchQuery(
    [PlaylistApiNames.FETCH_PLAYLIST, params],
    () => fetch(params),
    {
      staleTime: 3600000,
    }
  )
}