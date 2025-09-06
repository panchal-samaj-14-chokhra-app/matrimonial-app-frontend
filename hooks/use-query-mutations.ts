import { authService, profileService } from "@/lib/api-services"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"

export const useCheckUserExists = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["userExists", userId],
    queryFn: () => profileService.checkUserExists(userId!),
    enabled: !!userId,
    retry: false,
  })
}

export const useSignupFlow = () => {
  const sendOtpMutation = useMutation({
    mutationFn: authService.sendOtp,
    onError: (error: any) => {
      toast({
        title: "त्रुटि",
        description: error.response?.data?.message || "OTP भेजने में समस्या हुई",
        variant: "destructive",
      })
    },
  })

  const verifyOtpMutation = useMutation({
    mutationFn: authService.verifyOtpSignup,
    onError: (error: any) => {
      toast({
        title: "त्रुटि",
        description: error.response?.data?.message || "OTP सत्यापन में समस्या हुई",
        variant: "destructive",
      })
    },
  })

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast({
        title: "सफल",
        description: "पंजीकरण सफल हो गया। कृपया लॉगिन करें।",
      })
    },
    onError: (error: any) => {
      toast({
        title: "त्रुटि",
        description: error.response?.data?.message || "पंजीकरण में समस्या हुई",
        variant: "destructive",
      })
    },
  })

  return {
    sendOtp: sendOtpMutation,
    verifyOtp: verifyOtpMutation,
    register: registerMutation,
  }
}

export const useForgotPasswordFlow = () => {
  const sendForgotPasswordOtpMutation = useMutation({
    mutationFn: authService.sendForgotPasswordOtp,
    onSuccess: () => {
      toast({
        title: "सफल",
        description: "OTP आपके ईमेल पर भेज दिया गया है",
      })
    },
    onError: (error: any) => {
      toast({
        title: "त्रुटि",
        description: error.response?.data?.message || "OTP भेजने में समस्या हुई",
        variant: "destructive",
      })
    },
  })

  const verifyOtpForgotMutation = useMutation({
    mutationFn: authService.verifyOtpForgot,
    onSuccess: () => {
      toast({
        title: "सफल",
        description: "OTP सत्यापित हो गया",
      })
    },
    onError: (error: any) => {
      toast({
        title: "त्रुटि",
        description: error.response?.data?.message || "OTP सत्यापन में समस्या हुई",
        variant: "destructive",
      })
    },
  })

  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPasswordWithOtp,
    onSuccess: () => {
      toast({
        title: "सफल",
        description: "पासवर्ड सफलतापूर्वक रीसेट हो गया। कृपया लॉगिन करें।",
      })
    },
    onError: (error: any) => {
      toast({
        title: "त्रुटि",
        description: error.response?.data?.message || "पासवर्ड रीसेट में समस्या हुई",
        variant: "destructive",
      })
    },
  })

  return {
    sendForgotPasswordOtp: sendForgotPasswordOtpMutation,
    verifyOtpForgot: verifyOtpForgotMutation,
    resetPassword: resetPasswordMutation,
  }
}

export const useMatrimonialProfile = () => {
  const createProfileMutation = useMutation({
    mutationFn: ({ data, images }: { data: any; images?: File[] }) =>
      profileService.createMatrimonialProfile(data, images),
    onSuccess: () => {
      toast({
        title: "सफल",
        description: "आपकी प्रोफाइल सफलतापूर्वक बनाई गई है",
      })
    },
    onError: (error: any) => {
      toast({
        title: "त्रुटि",
        description: error.response?.data?.message || "प्रोफाइल बनाने में समस्या हुई",
        variant: "destructive",
      })
    },
  })

  return {
    createProfile: createProfileMutation,
  }
}
