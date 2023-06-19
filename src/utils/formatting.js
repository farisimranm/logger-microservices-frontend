const getPrettyAuditLogs = (auditLogs) => {
    if(Array.isArray(auditLogs) && auditLogs.length > 0) {
    return auditLogs.map((auditLog) => ({
        auditLogId: auditLog.auditLogId,
        referenceNumber: auditLog.referenceNumber,
        module: auditLog.activity.module,
        action: auditLog.activity.action,
        transactionTimestamp: auditLog.transactionTimestamp,
        logLevel: auditLog.logLevel,
        username: auditLog.source.user.username
    }));
    }
    return auditLogs;
};

export { getPrettyAuditLogs };