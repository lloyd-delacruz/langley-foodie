import { useEffect, useState } from 'react'
import { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function useRealtime<T>(
  table: string,
  filter?: string,
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(true)
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    let realtimeChannel: RealtimeChannel

    const setupRealtime = async () => {
      // Create channel
      realtimeChannel = supabase.channel(`${table}-changes`)

      // Listen for changes
      realtimeChannel
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: table,
            filter: filter
          },
          (payload) => {
            switch (payload.eventType) {
              case 'INSERT':
                setData(current => [...current, payload.new as T])
                break
              case 'UPDATE':
                setData(current =>
                  current.map(item =>
                    (item as any).id === payload.new.id ? payload.new as T : item
                  )
                )
                break
              case 'DELETE':
                setData(current =>
                  current.filter(item => (item as any).id !== payload.old.id)
                )
                break
            }
          }
        )
        .subscribe()

      setChannel(realtimeChannel)
      setLoading(false)
    }

    setupRealtime()

    return () => {
      if (realtimeChannel) {
        realtimeChannel.unsubscribe()
      }
    }
  }, [table, filter])

  return { data, setData, loading, channel }
}

// Specific hook for posts
export function useRealtimePosts(category?: string) {
  const filter = category ? `category=eq.${category}` : undefined
  
  return useRealtime('posts', filter, [])
}