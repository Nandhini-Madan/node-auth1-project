
exports.seed =async function(knex) {

  
      // Inserts seed entries
      return await knex('users').insert([
        {id: 1, username: 'name1',password:'abc'},
        {id: 2, username: 'name2',password:'abcd1'},
        {id: 3, username: 'name3',password:'abc2'}
      ]);
  
};
