module.exports = {
    puerto: process.env.PORT || 30027,
    DEV: process.env.DEV || true,
    dbName: process.env.DBNAME || 'dzewodhi',
    dbUser: process.env.DBUSER || 'dzewodhi',
    dbPassword: process.env.DBPWD || '36QR90Nci551OKgwxnQVUrN4Hxrs-Rfy',
    dbHost: process.env.DBHOST || 'kashin.db.elephantsql.com',
    dbDialect: process.env.DIALECT || 'postgres',
    token_key: process.env.SECRET_TOKEN || '6Zfx~^AFX8o3"<l,!S*B#kM>6:p:.q).(KKH;k>4ConY7wp.yd^g@^g#PvsK*I:'
}