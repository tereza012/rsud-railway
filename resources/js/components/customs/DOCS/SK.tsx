import { Head } from "@inertiajs/react";
import './sk.css'
import type { DateRange } from "react-day-picker";

export default function SK(
    {
        name,
        nip,
        institution,
        jabatan,
        title,
        role,
        docsNumber,
        period,
    }: {
        name: string,
        nip: string,
        institution: string,
        jabatan: string,
        title: string,
        role: string,
        docsNumber: string,
        period: DateRange
    }) {

    const getMonthName = (month: number) => {
        switch (month) {
            case 0:
                return "Januari";
            case 1:
                return "Februari";
            case 2:
                return "Maret";
            case 3:
                return "April";
            case 4:
                return "Mei";
            case 5:
                return "Juni";
            case 6:
                return "Juli";
            case 7:
                return "Agustus";
            case 8:
                return "September";
            case 9:
                return "Oktober";
            case 10:
                return "November";
            case 11:
                return "Desember";
            default:
                return "";
        }
    };

    return (
        <>
            <Head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            </Head>
            <div className="w-[813px] h-[1247px] flex flex-col  relative text-center pt-[47.244094488px] pb-[96px] pl-[96px] pr-[88.440944882px]">
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <span />
                </p>
                <table border={0} cellSpacing={0} cellPadding={0} className="absolute left-28 top-16">
                    <tbody>
                        <tr>
                            <td>
                                <img
                                    className="w-28 h-40"
                                    src="data:image/jpg;base64,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" />
                            </td>
                        </tr></tbody></table>
                <p />
                <div className="w-full pl-32">
                    <h3 className="text-center">
                        <a className="bookmark0">‌</a>PEMERINTAH KABUPATEN SLEMAN
                    </h3>
                    <h2 className="text-center">
                        <a className="bookmark1">‌</a>DINAS KESEHATAN
                    </h2>
                    <h1 className="text-center">
                        <a className="bookmark2">‌</a>RUMAH SAKIT UMUM DAERAH PRAMBANAN
                    </h1>
                    <table border={0} cellSpacing={0} cellPadding={0} className="w-full flex justify-center">
                        <tbody><tr>
                            <td className="flex justify-center">
                                <img width={308} height={38} src="data:image/png;base64,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" />
                            </td>
                        </tr></tbody></table>
                    <p />
                    <p className="text-center px-16">
                        Jalan Prambanan-Piyungan Km.7 , Delegan,
                        Sumberharjo, Prambanan, Sleman, Yogyakarta, 55572 Telepon (0274) 4398356,
                        IGD (0274) 4398357 Faksimile (0274) 4398570
                    </p>
                    <p className="text-center px-26">
                        <a href="mailto:rsud.prambanan@slemankab.go.id" className="a" target="_blank">Laman: rsudprambanan.slemankab.go.id, Surel: </a><a href="mailto:rsud.prambanan@slemankab.go.id" target="_blank">rsud.prambanan@slemankab.go.id</a>
                    </p>
                </div>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <div className="w-full border-2 border-slate-600" />
                <h4 className="text-center pt-5">
                    SURAT KETERANGAN PENGAJAR
                </h4>
                <p className="s1 text-center">
                    Nomor : <span style={{ color: '#f00' }}>{docsNumber}</span>
                </p>
                <p style={{ paddingTop: '7pt', textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <table style={{ borderCollapse: 'collapse', marginLeft: '5.75pt' }} cellSpacing={0}>
                    <tbody><tr style={{ height: '16pt' }}>
                        <td style={{ width: '469pt' }} colSpan={3}>
                            <p className="s3" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '12pt', textAlign: 'left' }}>
                                Yang bertanda tangan di bawah ini :
                            </p>
                        </td>
                    </tr>
                        <tr style={{ height: '19pt' }}>
                            <td style={{ width: '94pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingLeft: '7pt', textIndent: '0pt', textAlign: 'left' }}>
                                    a. Nama
                                </p>
                            </td>
                            <td style={{ width: '38pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingRight: '5pt', textIndent: '0pt', textAlign: 'right' }}>
                                    :
                                </p>
                            </td>
                            <td style={{ width: '337pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>
                                    dr. Wisnu Murti Yani, M.Sc
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '26pt' }}>
                            <td style={{ width: '94pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingLeft: '7pt', textIndent: '0pt', textAlign: 'left' }}>
                                    b. Jabatan
                                </p>
                            </td>
                            <td style={{ width: '38pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingRight: '5pt', textIndent: '0pt', textAlign: 'right' }}>
                                    :
                                </p>
                            </td>
                            <td style={{ width: '337pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>
                                    Direktur
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '26pt' }}>
                            <td style={{ width: '469pt' }} colSpan={3}>
                                <p className="s4" style={{ paddingTop: '9pt', textIndent: '0pt', textAlign: 'center' }}>
                                    MEMERINTAHKAN
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '19pt' }}>
                            <td style={{ width: '469pt' }} colSpan={3}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingLeft: '2pt', textIndent: '0pt', textAlign: 'left' }}>
                                    Dengan ini menerangkan bahwa :
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '19pt' }}>
                            <td style={{ width: '94pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingLeft: '6pt', textIndent: '0pt', textAlign: 'left' }}>
                                    a. Nama
                                </p>
                            </td>
                            <td style={{ width: '38pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingRight: '5pt', textIndent: '0pt', textAlign: 'right' }}>
                                    :
                                </p>
                            </td>
                            <td style={{ width: '337pt' }}>
                                <p className="s5" style={{ paddingTop: '2pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>
                                    {name}
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '19pt' }}>
                            <td style={{ width: '94pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingLeft: '6pt', textIndent: '0pt', textAlign: 'left' }}>
                                    b. NIP
                                </p>
                            </td>
                            <td style={{ width: '38pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingRight: '5pt', textIndent: '0pt', textAlign: 'right' }}>
                                    :
                                </p>
                            </td>
                            <td style={{ width: '337pt' }}>
                                <p className="s5" style={{ paddingTop: '2pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>
                                    {nip}
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '19pt' }}>
                            <td style={{ width: '94pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingLeft: '6pt', textIndent: '0pt', textAlign: 'left' }}>
                                    c. Institusi
                                </p>
                            </td>
                            <td style={{ width: '38pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingRight: '5pt', textIndent: '0pt', textAlign: 'right' }}>
                                    :
                                </p>
                            </td>
                            <td style={{ width: '337pt' }}>
                                <p className="s5" style={{ paddingTop: '2pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>
                                    {institution}
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '29pt' }}>
                            <td style={{ width: '94pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingLeft: '6pt', textIndent: '0pt', textAlign: 'left' }}>
                                    d. Jabatan
                                </p>
                            </td>
                            <td style={{ width: '38pt' }}>
                                <p className="s3" style={{ paddingTop: '2pt', paddingRight: '5pt', textIndent: '0pt', textAlign: 'right' }}>
                                    :
                                </p>
                            </td>
                            <td style={{ width: '337pt' }}>
                                <p className="s5" style={{ paddingTop: '2pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>
                                    {jabatan}
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '102pt' }}>
                            <td style={{ width: '469pt' }} colSpan={3}>
                                <p className="s3" style={{ paddingTop: '12pt', paddingLeft: '2pt', textIndent: '0pt', textAlign: 'left' }}>
                                    Telah :
                                </p>
                                <p className="s3" style={{ paddingTop: '6pt', paddingLeft: '2pt', textIndent: '0pt', lineHeight: '150%', textAlign: 'left' }}>
                                    Menjadi <span style={{ color: '#f00' }}>{role} </span> pada
                                    <span style={{ color: '#f00' }}> {title} </span>di RSUD Prambanan pada tanggal
                                    <span style={{ color: '#f00' }}> {period.from?.getDate()} – {period.to?.getDate()} April 2024</span>.
                                </p>
                                <p style={{ paddingTop: '6pt', textIndent: '0pt', textAlign: 'left' }}>
                                    <br />
                                </p>
                                <p className="s3" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '12pt', textAlign: 'left' }}>
                                    Demikian Surat keterangan ini dibuat untuk dipergunakan seperlunya
                                </p>
                            </td>
                        </tr>
                    </tbody></table>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <table style={{ borderCollapse: 'collapse', marginLeft: '254.65pt' }} cellSpacing={0} className="mt-40">
                    <tbody><tr style={{ height: '57pt' }}>
                        <td style={{ width: '184pt' }}>
                            <p className="s3" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '12pt', textAlign: 'left' }}>
                                Sleman, <span style={{ color: '#f00' }}>{getMonthName(new Date().getMonth())} {new Date().getDate()}</span>
                            </p>
                            <p className="s3" style={{ paddingLeft: '2pt', textIndent: '0pt', textAlign: 'left' }}>
                                Direktur Rumah Sakit Umum Daerah Prambanan
                            </p>
                        </td>
                    </tr>
                        <tr style={{ height: '32pt' }}>
                            <td style={{ width: '184pt' }}>
                                <p style={{ paddingTop: '6pt', textIndent: '0pt', textAlign: 'left' }}>
                                    <br />
                                </p>
                                <p className="s3" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '12pt', textAlign: 'left' }}>
                                    dr. WISNU MURTI YANI, M. Sc.
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '13pt' }}>
                            <td style={{ width: '184pt' }}>
                                <p className="s3" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '12pt', textAlign: 'left' }}>
                                    Pembina Tingkat I, IV/b
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '13pt' }}>
                            <td style={{ width: '184pt' }}>
                                <p className="s3" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '11pt', textAlign: 'left' }}>
                                    NIP 19760326 200501 2 008
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
