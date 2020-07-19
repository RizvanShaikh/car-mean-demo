var moduleName = `CMS`
const MESSAGES = {
    // Validation
    emptyCmsTitle: `Please enter ${moduleName} Title.`,
    emptyCmsType: `Please enter ${moduleName} Type.`,
    emptyContent: `Please enter ${moduleName} Content.`,
    emptyId: `Please enter valid Id`,
    emptyStatus: `Please enter status`,

    // Actions


    // Exception
    deleted: `${moduleName} Deleted successfully.`,
    updated: `${moduleName} Updated successfully.`,
    inserted: `${moduleName} Inserted successfully.`,
    change: `${moduleName} Status change successfully.`,
    cmsDeleteErr: "This is issue generated while hard deleting.",

    alreadyActive: `${moduleName} status already active.`,
    alreadyInActive: `${moduleName} status already inactive.`,

    // Label
    validation_Error: `Validation error.`,

}

//========================== Export Module Start ==============================

module.exports = {
    MESSAGES
};

//========================== Export Module End ===============================