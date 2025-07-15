// Supabase auth error message translation
export const translateAuthError = (error: string): string => {
  const errorMessages: Record<string, string> = {
    // 회원가입 관련 에러
    'User already registered': '이미 가입된 이메일입니다.',
    'Email already registered': '이미 가입된 이메일입니다.',
    'A user with this email address has already been registered': '이미 가입된 이메일입니다.',
    'Email address is already registered': '이미 가입된 이메일입니다.',
    'User with this email already exists': '이미 가입된 이메일입니다.',
    
    // 로그인 관련 에러
    'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
    'Invalid email or password': '이메일 또는 비밀번호가 올바르지 않습니다.',
    'Email not confirmed': '이메일 인증을 완료해주세요.',
    'Invalid credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
    'User not found': '존재하지 않는 사용자입니다.',
    
    // 이메일 형식 에러
    'Invalid email format': '올바른 이메일 형식을 입력해주세요.',
    'Email is required': '이메일을 입력해주세요.',
    'Unable to validate email address: invalid format': '올바른 이메일 형식을 입력해주세요.',
    
    // 비밀번호 관련 에러
    'Password is too short': '비밀번호는 최소 6자 이상이어야 합니다.',
    'Password must be at least 6 characters': '비밀번호는 최소 6자 이상이어야 합니다.',
    'Weak password': '더 강력한 비밀번호를 사용해주세요.',
    
    // 네트워크 및 서버 에러
    'Network error': '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
    'Server error': '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    'Unable to fetch': '네트워크 연결을 확인해주세요.',
    'Failed to fetch': '네트워크 연결을 확인해주세요.',
    
    // 기타 에러
    'Too many requests': '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
    'Rate limit exceeded': '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
    'Something went wrong': '문제가 발생했습니다. 다시 시도해주세요.',
    'An error occurred': '오류가 발생했습니다. 다시 시도해주세요.',
    
    // OAuth 관련 에러
    'OAuth error': '소셜 로그인 중 오류가 발생했습니다.',
    'Google OAuth error': 'Google 로그인 중 오류가 발생했습니다.',
    'GitHub OAuth error': 'GitHub 로그인 중 오류가 발생했습니다.',
    'Provider not supported': '지원하지 않는 로그인 방식입니다.',
    
    // 세션 관련 에러
    'Session expired': '세션이 만료되었습니다. 다시 로그인해주세요.',
    'Token expired': '인증 토큰이 만료되었습니다. 다시 로그인해주세요.',
    'Invalid token session': '유효하지 않은 토큰입니다.',
    'No session found': '로그인 세션을 찾을 수 없습니다.',
    
    // 권한 관련 에러
    'Access denied': '접근 권한이 없습니다.',
    'Insufficient permissions': '권한이 부족합니다.',
    'Unauthorized': '인증되지 않은 사용자입니다.',
    
    // 이메일 인증 관련 에러
    'Email link is invalid or has expired': '이메일 링크가 유효하지 않거나 만료되었습니다.',
    'Token has expired email': '인증 토큰이 만료되었습니다.',
    'Invalid token email': '유효하지 않은 토큰입니다.',
    'Email already confirmed': '이미 인증된 이메일입니다.',
    
    // 비밀번호 재설정 관련 에러
    'Password reset token is invalid or has expired': '비밀번호 재설정 토큰이 유효하지 않거나 만료되었습니다.',
    'Unable to send reset password email': '비밀번호 재설정 이메일 전송에 실패했습니다.',
    'Email not found in password reset': '해당 이메일을 찾을 수 없습니다.',
  };
  
  // 완전 일치하는 에러 메시지가 있는지 확인
  if (errorMessages[error]) {
    return errorMessages[error];
  }
  
  // 부분 일치하는 에러 메시지 확인
  for (const [key, value] of Object.entries(errorMessages)) {
    if (error.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // 기본 에러 메시지
  return '오류가 발생했습니다. 다시 시도해주세요.';
};