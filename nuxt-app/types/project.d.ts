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
    startTrl: number //    The technology maturity (technology readiness level) of the project at its beginning.
    currentTrl: number
    endTrl: number
    primaryTaxonomyNodes: TaxonomyNode[]
    additionalTaxonomyNodes: TaxonomyNode[]
    // destinations	[...]
    // program	program{...}
    // responsibleMd	program{...}
    // leadOrganization	organization{...}
    // supportingOrganizations	[...]
    // coFundingPartners	[...]
    // statesWithWork	[...]
    // programDirectors	[...]
    // programManagers	[...]
    // projectManagers	[...]
    // principalInvestigators	[...]
    // coInvestigators	[...]
    website: string
    // libraryItems	[...]
    // stiDaas	[...]
    closeoutSummary: string
    // closeoutDocuments	[...]
    // primaryImage	libraryItem{...}
    viewCount: number
}

export type TaxonomyNode = {
    /*
    taxonomyNodeId	integer($int64)
Unique identifier for the taxonomy node

taxonomyRootId	integer($int64)
Unique identifier for the root of this taxonomy node

parentNodeId	integer($int64)
Unique identifier for the taxonomy node/root that is the direct parent of this taxonomy node

level	integer($int64)
The level of this node on the tree (0 being the root)

code	string
Code of the taxonomy node

title	string
Title of the taxonomy node

definition	string
Definition of the taxonomy node

hasChildren	boolean
Defines whether this node has children

publishedUrl	string
Published URL of the taxonomy node
     */
}

export type PaginatedProjects = {
    projects: Project[],
    limit: number,
    offset: number,
    totalCount: number,
}