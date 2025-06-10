import { supabase } from './supabase'

export class StorageService {
  static async uploadImage(
    bucket: 'post-images' | 'avatars',
    file: File,
    path?: string
  ) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = path ? `${path}/${fileName}` : fileName

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return {
      path: data.path,
      url: publicUrl
    }
  }

  static async deleteImage(bucket: 'post-images' | 'avatars', path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      throw error
    }

    return true
  }

  static getPublicUrl(bucket: 'post-images' | 'avatars', path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return data.publicUrl
  }

  static async uploadAvatar(file: File, userId: string) {
    return this.uploadImage('avatars', file, userId)
  }

  static async uploadPostImage(file: File, postId?: string) {
    return this.uploadImage('post-images', file, postId)
  }
}