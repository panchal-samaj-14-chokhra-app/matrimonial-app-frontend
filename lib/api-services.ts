import api from "./axios-config"

// Type definitions
export interface User {
  id: string
  name: string
  email: string
  phone: string
  profileId: string
  memberType: "14-chokhra" | "other"
  isApproved: boolean
  createdAt: string
}

export interface Profile {
  id: string
  profileId: string
  userId: string
  name: string
  age: number
  gender: "male" | "female"
  occupation: string
  education: string
  location: string
  familyDetails: string
  preferences: string
  photos: string[]
  isActive: boolean
  isMarried: boolean
  isHidden: boolean
  contactVisible: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  phone: string
  password: string
  memberType: "14-chokhra" | "other"
  familyId?: string
}

export interface SendOtpRequest {
  email: string
}

export interface VerifyOtpRequest {
  email: string
  otp: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface VerifyOtpForgotRequest {
  email: string
  otp: string
}

export interface ResetPasswordRequest {
  email: string
  newPassword: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
  mobileNumber: string
  globalRole: string
  choklaId: string
}

export interface MatrimonialProfileData {
  userId: string
  aboutMe: string
  height: number
  weight: number
  complexion: string
  maritalStatus: string
  occupation: string
  income: number
  education: string
  religion: string
  caste: string
  subCaste: string
  motherTongue: string
  age: number
  manglik: boolean
  isProfileActive: boolean
  agePreferenceMin: number
  agePreferenceMax: number
  castePreference: string
  locationPreference: string
  createdByUserId: string
  dateOfBirth: string
  district: string
  familyOccupation: string
  gender: "MALE" | "FEMALE"
  gotra: string
  grandfatherName: string
  hobbies: string
  isPhysicallyAble: boolean
  motherName: string
  fatherName: string
  placeOfBirth: string
  profileImageUrl?: string
  skinComplexion: string
  socialLinks?: string
  timeOfBirth: string
  updatedByUserId: string
  wantsToJoinEvent: boolean
  annualFamilyIncome: number
}

// API Service Functions
export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await api.post("/api/auth/login", credentials)
    return response.data
  },

  // Register new user
  signup: async (data: SignupData): Promise<{ user: User; token?: string }> => {
    const response = await api.post("/api/auth/signup", data)
    return response.data
  },

  // Logout user
  logout: async (): Promise<void> => {
    await api.post("/auth/logout")
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post("/api/auth/forgot-password", { email })
    return response.data
  },

  // Send OTP for forgot password
  sendForgotPasswordOtp: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
    const response = await api.post("/api/auth/forgot-password", data)
    return response.data
  },

  // Verify OTP for forgot password
  verifyOtpForgot: async (data: VerifyOtpForgotRequest): Promise<{ message: string; verified: boolean }> => {
    const response = await api.post("/api/auth/verify-otp", data)
    return response.data
  },

  // Reset password with new password
  resetPasswordWithOtp: async (data: ResetPasswordRequest): Promise<{ message: string }> => {
    const response = await api.post("/api/auth/reset-password", data)
    return response.data
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await api.post("/api/auth/reset-password", { token, password })
    return response.data
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("/auth/me")
    return response.data
  },

  // Send OTP for signup
  sendOtp: async (data: SendOtpRequest): Promise<{ message: string }> => {
    const response = await api.post("/api/auth/send-otp", data)
    return response.data
  },

  // Verify OTP for signup
  verifyOtpSignup: async (data: VerifyOtpRequest): Promise<{ message: string; verified: boolean }> => {
    const response = await api.post("/api/auth/verify-otp-signup", data)
    return response.data
  },

  // Register user after OTP verification
  register: async (data: RegisterRequest): Promise<{ user: User; token: string }> => {
    const response = await api.post("/api/auth/register", data)
    return response.data
  },
}

export const profileService = {
  // Get all profiles with filters
  getProfiles: async (filters?: {
    gender?: string
    ageMin?: number
    ageMax?: number
    location?: string
    education?: string
    occupation?: string
    page?: number
    limit?: number
  }): Promise<{ profiles: Profile[]; total: number; page: number; totalPages: number }> => {
    const response = await api.get("/profiles", { params: filters })
    return response.data
  },

  checkUserExists: async (userId: string): Promise<{ exists: boolean }> => {
    const response = await api.get(`/metrimonial/exists/${userId}`)
    return response.data
  },

  // Get profile by ID
  getProfile: async (id: string): Promise<Profile> => {
    const response = await api.get(`/profiles/${id}`)
    return response.data
  },

  // Create new profile
  createProfile: async (
    data: Omit<Profile, "id" | "profileId" | "userId" | "createdAt" | "updatedAt">,
  ): Promise<Profile> => {
    const response = await api.post("/profiles", data)
    return response.data
  },

  // Update profile
  updateProfile: async (id: string, data: Partial<Profile>): Promise<Profile> => {
    const response = await api.put(`/profiles/${id}`, data)
    return response.data
  },

  // Delete profile
  deleteProfile: async (id: string): Promise<void> => {
    await api.delete(`/profiles/${id}`)
  },

  // Upload profile photos
  uploadPhotos: async (profileId: string, files: File[]): Promise<{ photos: string[] }> => {
    const formData = new FormData()
    files.forEach((file) => formData.append("photos", file))

    const response = await api.post(`/profiles/${profileId}/photos`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },

  // Get user's own profile
  getMyProfile: async (): Promise<Profile> => {
    const response = await api.get("/profiles/me")
    return response.data
  },

  createMatrimonialProfile: async (data: MatrimonialProfileData, images?: File[]): Promise<any> => {
    const formData = new FormData()

    // Add all profile data fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString())
      }
    })

    // Add images if provided
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image)
      })
    }

    const response = await api.post("/metrimonial", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },
}

export const adminService = {
  // Get pending approvals
  getPendingApprovals: async (): Promise<User[]> => {
    const response = await api.get("/admin/pending-approvals")
    return response.data
  },

  // Approve user
  approveUser: async (userId: string): Promise<void> => {
    await api.post(`/admin/approve-user/${userId}`)
  },

  // Reject user
  rejectUser: async (userId: string, reason: string): Promise<void> => {
    await api.post(`/admin/reject-user/${userId}`, { reason })
  },

  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get("/admin/users")
    return response.data
  },

  // Get analytics
  getAnalytics: async (): Promise<{
    totalUsers: number
    totalProfiles: number
    activeProfiles: number
    pendingApprovals: number
    marriedProfiles: number
  }> => {
    const response = await api.get("/admin/analytics")
    return response.data
  },
}
