exports.up = (pgm) => {
    const columns = {
        id: { type: 'serial', primaryKey: true },
        user_id: 'integer',
        name: 'string',
        url: { type: 'string', notNull: true},
        checked_at: 'datetime',
        is_ok: 'bool'
    }
    pgm.createTable('bookmarks', columns)
};

exports.down = (pgm) => {
    pgm.dropTable('bookmarks')
};
