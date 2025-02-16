interface user {
    name: string,
    username: string,
    password: string,
    phone: string,
    email: string,
    role: string
    user_info: userInfo,
    files: files
}

interface files {
    files: string[],
    file_type: string[],
}

interface userInfo {
    gender: string,
    nip: string,
    employee_position: string,
    institution: string,
    employee_status: string,
    last_education: string,
    profile_picture: string,
    npwp?: string,
    bank_number?: string,
    bank_name?: string,
    owner_name?: string,
    golongan?: string,
    nakes_type?: string,
    residence_address?: string,
    province?: string,
    regency?: string,
}

export type {user, userInfo, files}
