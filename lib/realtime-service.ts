"use client"

import React from "react"

// Real-time service for live updates
class RealtimeService {
  private static instance: RealtimeService
  private eventSource: EventSource | null = null
  private listeners: Map<string, Set<(data: any) => void>> = new Map()
  private isConnected = false

  static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService()
    }
    return RealtimeService.instance
  }

  connect(userId?: string) {
    if (this.isConnected) return
    this.isConnected = true
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
    this.isConnected = false
    this.listeners.clear()
    console.log("Real-time service disconnected")
  }

  subscribe(eventType: string, callback: (data: any) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set())
    }
    this.listeners.get(eventType)!.add(callback)
    return () => {
      this.listeners.get(eventType)!.delete(callback)
    }
  }

  private emit(eventType: string, data: any) {
    const callbacks = this.listeners.get(eventType)
    if (callbacks) {
      callbacks.forEach(cb => cb(data))
    }
  }

  broadcastAnnouncement(announcement: any) {
    this.emit('announcement', announcement)
    this.emit('notification', {
      type: 'announcement',
      title: 'New Announcement',
      message: announcement.title,
      data: announcement
    })
  }

  broadcastAssignment(assignment: any) {
    this.emit('assignment', assignment)
    this.emit('notification', {
      type: 'assignment',
      title: 'New Assignment',
      message: assignment.title,
      data: assignment
    })
  }

  sendChatMessage(message: any) {
    this.emit('chat_message', message)
  }

  updateUserStatus(userId: string, status: 'online' | 'offline' | 'away') {
    this.emit('user_status', { userId, status, timestamp: Date.now() })
  }

  isConnectedToServer(): boolean {
    return this.isConnected
  }

  sendTypingIndicator(chatId: string, userId: string, isTyping: boolean) {
    this.emit('typing', { chatId, userId, isTyping })
  }

  updateFileUploadProgress(fileId: string, progress: number) {
    this.emit('file_upload_progress', { fileId, progress })
  }

  broadcastProjectUpdate(projectId: string, update: any) {
    this.emit('project_update', { projectId, ...update })
  }

  getStoredData(channel: string) {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(channel)
      return data ? JSON.parse(data) : null
    }
    return null
  }

  publish(channel: string, data: any) {
    if (typeof window !== "undefined") {
      localStorage.setItem(channel, JSON.stringify(data))
    }
    this.emit(channel, data)
  }
}

export const realtimeService = RealtimeService.getInstance()

export function useRealtime() {
  const [isConnected, setIsConnected] = React.useState(false)

  React.useEffect(() => {
    realtimeService.connect()
    setIsConnected(realtimeService.isConnectedToServer())

    return () => {
      realtimeService.disconnect()
    }
  }, [])

  const subscribe = React.useCallback((eventType: string, callback: (data: any) => void) => {
    return realtimeService.subscribe(eventType, callback)
  }, [])

  return {
    isConnected,
    subscribe,
    broadcast: {
      announcement: realtimeService.broadcastAnnouncement.bind(realtimeService),
      assignment: realtimeService.broadcastAssignment.bind(realtimeService),
      chatMessage: realtimeService.sendChatMessage.bind(realtimeService),
      projectUpdate: realtimeService.broadcastProjectUpdate.bind(realtimeService),
    }
  }
}
