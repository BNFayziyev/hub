export type Tier = 'haiku' | 'sonnet' | 'opus'
export type Limit = { kind: string; percentUsed: number; resetsAt?: string }
export type Mode = 'auto' | Tier | 'off'

declare module 'claude-code' {
  interface PluginState {
    tejamkor: {
      limits: Limit[]
      now: number
      tier: Tier | null
      mode: Mode
      usd: number
      ctx: number
      hubInjected: boolean
    }
  }
}
