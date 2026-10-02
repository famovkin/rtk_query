import z from 'zod';
// import type { CurrentUserReaction, Images, User } from '@/common/types';

import type {
  fetchTracksResponseSchema,
  trackAttachmentSchema,
  trackDataSchema,
  trackRelationshipsSchema,
  tracksIncludedSchema,
  tracksMetaSchema,
} from '../model/tracks.schemas';

// export type FetchTracksResponse = {
//   data: TrackData[];
//   included: TracksIncluded[];
//   meta: TracksMeta;
// };

// export type TrackData = {
//   id: string;
//   type: 'tracks';
//   attributes: TrackAttributes;
//   relationships: TrackRelationships;
// };

// export type TracksIncluded = {
//   id: string;
//   type: 'artists';
//   attributes: {
//     name: string;
//   };
// };

// export type TracksMeta = {
//   nextCursor: string | null;
//   page: number;
//   pageSize: number;
//   totalCount: number | null;
//   pagesCount: number | null;
// };

// export type TrackAttributes = {
//   title: string;
//   addedAt: string;
//   attachments: TrackAttachment[];
//   images: Images;
//   currentUserReaction: CurrentUserReaction;
//   user: User;
//   isPublished: boolean;
//   publishedAt: string;
// };

// export type TrackRelationships = {
//   artists: {
//     data: {
//       id: string;
//       type: string;
//     };
//   };
// };

// export type TrackAttachment = {
//   id: string;
//   addedAt: string;
//   updatedAt: string;
//   version: number;
//   url: string;
//   contentType: string;
//   originalName: string;
//   fileSize: number;
// };

export type FetchTracksResponse = z.infer<typeof fetchTracksResponseSchema>;
export type TrackData = z.infer<typeof trackDataSchema>;
export type TracksIncluded = z.infer<typeof tracksIncludedSchema>;
export type TracksMeta = z.infer<typeof tracksMetaSchema>;
export type TrackAttributes = z.infer<typeof trackAttachmentSchema>;
export type TrackRelationships = z.infer<typeof trackRelationshipsSchema>;
export type TrackAttachment = z.infer<typeof trackAttachmentSchema>;

// Arguments
export type FetchTracksArgs = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'publishedAt' | 'likesCount';
  sortDirection?: 'asc' | 'desc';
  tagsIds?: string[];
  artistsIds?: string[];
  userId?: string;
  includeDrafts?: boolean;
  paginationType?: 'offset' | 'cursor';
  cursor?: string;
};
