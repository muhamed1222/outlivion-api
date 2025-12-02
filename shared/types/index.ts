/**
 * Shared TypeScript types for Outlivion monorepo
 * Synchronized with database schema
 */

// ==================
// User Types
// ==================

export interface User {
  id: string; // uuid
  telegramId: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  photoUrl?: string | null;
  balance: number; // in cents
  referredBy?: string | null; // uuid
  firstPaymentProcessed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==================
// Subscription Types
// ==================

export interface Subscription {
  id: string; // uuid
  userId: string; // uuid
  plan: string; // 'monthly', 'yearly', etc.
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionWithDetails extends Subscription {
  daysRemaining?: number;
  isExpired?: boolean;
}

// ==================
// Payment Types
// ==================

export interface Payment {
  id: string; // uuid
  userId: string; // uuid
  subscriptionId?: string | null; // uuid
  amount: number; // in cents
  currency: string; // 'USD', 'EUR', etc.
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  mercuryoOrderId?: string | null;
  mercuryoData?: Record<string, any> | null;
  plan: string;
  createdAt: Date;
  updatedAt: Date;
}

// ==================
// Server Types
// ==================

export interface Server {
  id: string; // uuid
  name: string;
  host: string;
  port: number;
  location?: string | null;
  country?: string | null;
  isActive: boolean;
  load: number; // 0-100
  maxUsers: number;
  currentUsers: number;
  createdAt: Date;
  updatedAt: Date;
}

// ==================
// Config Types (VPN Configurations)
// ==================

export interface Config {
  id: string; // uuid
  userId: string; // uuid
  serverId: string; // uuid
  marzbanUserId: string;
  vlessConfig: string;
  qrCode?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServerConfig extends Config {
  serverName?: string;
  serverLocation?: string;
  serverCountry?: string;
}

// ==================
// Promo Code Types
// ==================

export interface PromoCode {
  id: string; // uuid
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses?: number | null;
  currentUses: number;
  validFrom: Date;
  validUntil?: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPromoCode {
  id: string; // uuid
  userId: string; // uuid
  promoCodeId: string; // uuid
  paymentId?: string | null; // uuid
  createdAt: Date;
}

// ==================
// Log Types
// ==================

export interface Log {
  id: string; // uuid
  userId?: string | null; // uuid
  type: 'auth' | 'payment' | 'api' | 'error';
  level: 'info' | 'warn' | 'error';
  message: string;
  metadata?: Record<string, any> | null;
  createdAt: Date;
}

// ==================
// API Response Types
// ==================

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  token: string; // legacy support
  user: {
    id: string;
    telegramId: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    photoUrl?: string | null;
    isNewUser?: boolean;
  };
}

export interface CreatePaymentResponse {
  paymentId: string;
  paymentUrl: string;
  amount: number;
  currency: string;
}

export interface PromoCodeResponse {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  valid: boolean;
  message?: string;
}

// ==================
// Telegram Types
// ==================

export interface TelegramUser {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: string;
  hash: string;
}

export interface TelegramAuthData extends TelegramUser {
  referralId?: string;
}

// ==================
// Utility Types
// ==================

export type ApiError = {
  error: string;
  code?: string;
  message?: string;
  details?: string[];
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
