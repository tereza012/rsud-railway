import { Head } from '@inertiajs/react'
import React, { useState } from 'react'

const descTraining = `<b>Pelatihan</b> atau <b>penggladian</b> adalah kegiatan melatih atau mengembangkan suatu keterampilan dan pengetahuan kepada diri sendiri atau orang lain, yang terkait dengan kompetensi tertentu yang dianggap berguna. <br/><br/>
&emsp; <b>Pelatihan</b> mempersiapkan peserta latihan untuk mengambil jalur profesi tertentu yang disesuaikan dengan teknologi dan organisasi tempat bekerja, dan membantu peserta memperbaiki kecakapan dalam kegiatannya terutama mengenai pengertian dan keterampilan.`

export default function Profile() {
    return (
        <>
            <Head title="Profile" />
            <div className="w-full mt-5 px-8">
                <section className="max-w-1/2 break-words">
                    <h1 className='text-2xl z-[1]'>
                        <strong> Pelatihan</strong>
                    </h1>
                    <p className='z-[1] font-sans' dangerouslySetInnerHTML={{ __html: descTraining }}>
                    </p>
                </section>
                <hr className='mt-5' />
                <section className="max-w-1/2 mt-2">
                    <h1 className='text-2xl z-[1]'>
                        <strong> Struktur Organisasi</strong>
                    </h1>
                    <p className='text-xl z-[1] font-sans'>
                        TBD
                    </p>
                </section>
            </div>
        </>
    )
}
