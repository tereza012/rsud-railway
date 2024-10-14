enum FileTypeEnum {
    CV = 'cv',
    IJAZAH = 'ijazah',
    SK = 'sk',
    SERTIFIKAT = 'sertifikat',
    REKENING = 'rekening',
    NPWP = 'npwp'
}

const fileTypeConfig = {
    organizer: [
        {type: FileTypeEnum.CV, max: 1},
        {type: FileTypeEnum.IJAZAH, max: Infinity},
        {type: FileTypeEnum.SK, max: Infinity},
        {type: FileTypeEnum.SERTIFIKAT, max: Infinity}
    ],
    controller: [
        {type: FileTypeEnum.CV, max: 1},
        {type: FileTypeEnum.IJAZAH, max: Infinity},
        {type: FileTypeEnum.SK, max: Infinity},
        {type: FileTypeEnum.SERTIFIKAT, max: Infinity}
    ],
    facilitator: [
        {type: FileTypeEnum.CV, max: 1},
        {type: FileTypeEnum.IJAZAH, max: Infinity},
        {type: FileTypeEnum.REKENING, max: 1},
        {type: FileTypeEnum.NPWP, max: 1}
    ],
    user: [
        {type: FileTypeEnum.CV, max: 1},
        {type: FileTypeEnum.IJAZAH, max: Infinity},
        {type: FileTypeEnum.SERTIFIKAT, max: Infinity}
    ]
};

export {FileTypeEnum, fileTypeConfig};
