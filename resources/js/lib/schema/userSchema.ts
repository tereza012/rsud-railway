import {z} from "zod";

const maxFileSize = 2 * 1024 * 1024;

const baseSchema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong"),
    username: z.string().min(1, "Nama Pengguna tidak boleh kosong").transform((val) => val.toLowerCase().replaceAll(' ', '').replaceAll('/', '\/')),
    email: z.string().email("Email tidak boleh kosong"),
    password: z.string().optional().superRefine((val, ctx) => {
        if (val !== undefined && val !== '') {
            if (val.length < 8) {
                ctx.addIssue({
                    code: "custom",
                    message: "Kata Sandi harus minimal 8 karakter",
                    path: ["password"],
                });
            }
        }
    }),
    phone: z.coerce.string().min(1, "Nomor Telepon tidak boleh kosong").max(20, "Nomor Telepon tidak boleh lebih dari 20 karakter"),
    gender: z.enum(["Laki-laki", "Perempuan"], {
        required_error: "Gender harus dipilih",
        invalid_type_error: "Gender tidak valid",
    }),
    nip: z.string()
        .refine(
            (val) => val === '' || (val.length === 18 && /^\d+$/.test(val)),
            (val) => ({
                message: val === '' ? 'Nomor Induk Pegawai tidak boleh kosong' :
                    val.length !== 18 ? 'Nomor Induk Pegawai harus terdiri dari tepat 18 digit, anda memasukkan ' + val.length + ' digit' :
                        'Nomor Induk Pegawai harus terdiri dari digit saja'
            })
        )
        .optional(),
    employee_position: z.string().min(1, "Posisi Pegawai tidak boleh kosong"),
    institution: z.string().min(1, "Institusi tidak boleh kosong"),
    employee_status: z.string().min(1, "Status Pegawai tidak boleh kosong"),
    last_education: z.enum(["D1", "D2", "D3", "D4", "S1", "S2", "S3"], {
        required_error: "Pendidikan terakhir harus dipilih",
        invalid_type_error: "Pendidikan terakhir tidak valid",
    }),
    profile_picture: z.any()
        .optional()
        .superRefine((file, ctx) => {
            if (file && file.size > maxFileSize) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Ukuran file tidak boleh lebih dari 2MB',
                });
            }
        }),
})

const facilitatorSchema = baseSchema.extend({
    npwp: z.string()
        .length(16, 'NPWP harus terdiri dari tepat 16 digit')
        .regex(/^\d+$/, 'NPWP harus terdiri dari digit saja'),
    bank_number:
        z.coerce.number().min(1, "Nomor Bank tidak boleh kosong").transform(String),
    bank_name:
        z.string().min(1, "Nama Bank tidak boleh kosong"),
    owner_name:
        z.string().min(1, "Nama Pemilik tidak boleh kosong"),
})

const userSchema = baseSchema.extend({
    golongan:
        z.enum(["1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A", "9A", "1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B", "1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D"], {
            invalid_type_error: "Golongan tidak valid",
        }),
    institution_address: z.string().min(1, "Alamat Institusi tidak boleh kosong"),
    nakes_type:
        z.enum(['Tenaga Medis',
            'Tenaga Psikologi Klinis',
            'Tenaga Keperawatan',
            'Tenaga Kebidanan',
            'Tenaga Kefarmasian',
            'Tenaga Kesehatan Masyarakat',
            'Tenaga Kesehatan Lingkungan',
            'Tenaga Gizi',
            'Tenaga Keterapian Fisik',
            'Tenaga Keteknisian Medis',
            'Tenaga Teknologi Biomedika',
            'Tenaga Kesehatan Tradisional'], {
            invalid_type_error: "Nakes tidak valid",
            required_error: "Nakes harus dipilih",
        }),
    residence_address:
        z.string().min(1, "Alamat tidak boleh kosong"),
    province:
        z.string().min(1, "Provinsi tidak boleh kosong"),
    regency:
        z.string().min(1, "Kabupaten/Kota tidak boleh kosong"),
});

export {baseSchema, facilitatorSchema, userSchema};
