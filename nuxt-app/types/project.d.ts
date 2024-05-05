export type ProjectList = {
    projects: ProjectListEntry[]
    totalCount: number
}

export type ProjectListEntry = {
    // acronym: string // No longer supported, always empty
    projectId: number
    // title: string // No longer supported, always empty
    // website: string // No longer supported, always empty
    lastUpdated: string // Date (YYYY-mm-dd)
}

export type ProjectData = {
    project: Project
}

export type Project = {
    projectId: number
    lastUpdated: string // Date ISO 8601 YYYY-MM-DD
    title: string
    acronym: string
    statusDescription: string
    description: string
    benefits: string
    startDateString: string // The month and year the project was authorized to proceed.
    endDateString: string // The month and year the project is expected to complete its work.
    startTrl: number // The technology maturity (technology readiness level) of the project at its beginning.
    currentTrl: number
    endTrl: number
    primaryTaxonomyNodes: TaxonomyNode[]
    additionalTaxonomyNodes: TaxonomyNode[]
    destinations: LkuCode[]
    program: Program
    responsibleMd: Program
    leadOrganization: Organization
    supportingOrganizations: Organization[]
    coFundingPartners: Organization[]
    statesWithWork: Location[]
    programDirectors: Contact[]
    programManagers: Contact[]
    projectManagers: Contact[]
    principalInvestigators: Contact[]
    coInvestigators: Contact[]
    website: string
    libraryItems: LibraryItem[]
    stiDaas: LibraryItem
    closeoutSummary: string
    closeoutDocuments: LibraryItem[]    
    primaryImage: LibraryItem
    viewCount: number
}

export type TaxonomyNode = {
    taxonomyNodeId: number
    taxonomyRootId: number
    parentNodeId: number
    level: number
    code: string
    title: string
    definition: string
    hasChildren: boolean
    publishedUrl: string
}

export type LkuCode = {
    lkuCodeId: number
    code: string
    description: string
    lkuCodeTypeId: number
    lkuCodeType: LkuCodeType
    displayOrder: number
}

export type LkuCodeType = {
    lkuCodeTypeId: number
    codeType: string
    description: string
}

export type Program = {
    programId: number
    acronym: string
    active: boolean
    description: string
    parentProgram?: Program
    parentProgramId?: number
    responsibleMd: Program
    responsibleMdId: number
    title: string
}

export type Organization = {
    organizationId: number
    acronym: string
    fax: string
    isActive: boolean
    // location: Location
    city: string
    country: {
        abbreviation: string
        countryId: number
        name: string
    }
    locationId: number
    organizationName: string
    organizationType: LkuCode
    organizationTypeId: number
    parentOrganizationId: number
    phone: string
    replacementOrganizationId: number
    url: string
    NAOrganization: boolean // True if the organization is in North America
    external: boolean
    linkCount: number
    murepUnitId: number
    ein: string // The employer identification number
    uei: string // The unique entity identifier
    dunsNumber: string // The DUNS number assigned to the organization.
    msiData: Record<string, string>
    setAsideData: string[]
}

export type Location = {
    locationId: number
    addressLine1: string
    addressLine2: string
    city: string
    locationType: LkuCode
    locationTypeId: number
    state: string
    stateTerritoryName: string
    zip: string
    zip2: string
    NALocation: string // True if this location is located in North America
    country: LkuCode
    countryId: number
    shortLocationString: string
}

export type Contact = {
    contactId: number
    displayOrder: number
    fax: string
    firstName: string
    lastName: string
    fullName: string
    fullNameInverted: string
    location: Location
    locationId: number
    middleInitial: string
    organization: Organization
    prefix: string
    primaryEmail: string
    secondaryEmail: string
    suffix: string
    title: string
    workPhoneExtension: string
    workPhone: string
    receiveEmail: number // 1 if the contact is signed up to receive TechPort emails
    // isPublicEmail: boolean
    publicEmail: boolean
}

export type LibraryItem = {
    id: number
    title: string
    contentType: LkuCode
    files: File[]
    description: string
    url: string
    publishedDateString: string
    publishedBy: string
}

export type File = {
    fileId: number
    url: string
    fileSize: number
    fileExtension: string
    fileName: string
}

export type PaginatedProjects = {
    projects: Project[]
    limit: number
    offset: number
    totalCount: number
}