import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { StyleSheet, } from 'react-native'
import { Sequelize } from 'sequelize';



// Creating database in sqlite 

const db = SQLite.openDatabase(

  {
    name: "local-db",
    location: "default"
  }, () => { console.log("database created succesfully") }, error => { console.log(error) }
);

// Creating required tables 
// db.transaction((tx) => {
//   tx.executeSql(
//     'CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY,name TEXT,email TEXT,passsword TEXT)',
//     [],
//     () => {
//       console.log('Users table created successfully');
//     },
//     (error) => {
//       console.error('Failed to create table:', error);
//     }
//   );
// });

db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY NOT NULL, name TEXT, email TEXT, [password] TEXT, profile_picture TEXT)',
    [],
    () => {
      console.log('Users table created successfully');

      // Inserção manual do usuário padrão
      tx.executeSql(
        'INSERT OR IGNORE INTO users (id, name, email, [password], profile_picture) VALUES (?, ?, ?, ?, ?)',
        ['1', 'Carlos', 'carlos@teste.com', '1234', ''],
        () => {
          console.log('Usuário padrão inserido com sucesso');
        },
        (error) => {
          console.error('Erro ao inserir usuário padrão:', error);
        }
      );
    },
    (error) => {
      console.error('Failed to create table:', error);
    }
  );
});


db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS growers (grower_id TEXT PRIMARY KEY NOT NULL, fullname TEXT, email TEXT)',
    [],
    () => {
      console.log('Growers table created successfully');
    },
    (error) => {
      console.error('Failed to create table:', error);
    }
  );
});


db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS crop (crop_id TEXT PRIMARY KEY NOT NULL,crop TEXT)',
    [],
    () => {
      console.log('Crop table created successfully');
    },
    (error) => {
      console.error('Failed to create table:', error);
    }
  );
});



db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS variety (variety_id TEXT PRIMARY KEY NOT NULL, variety TEXT,crop_id TEXT, FOREIGN KEY(crop_id)  REFERENCES crop(crop_id))',
    [],
    () => {
      console.log('variety table created successfully');
    },
    (error) => {
      console.error('Failed to create table:', error);
    }
  );
});

db.transaction((tx) => {

  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS variety_type (variet_type_id INT PRIMARY KEY NOT NULL, variety_type TEXT, description TEXT)',
    [],
    () => {
      console.log('variety type table created ')

    }, (error) => {
      console.error('failed to create table: ', error)

    }
  )
})

db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS farms (farm_id TEXT PRIMARY KEY NOT NULL, hectors TEXT,region_id TEXT,district TEXT,area_name TEXT,address TEXT,physical_address TEXT,epa TEXT, crop_id TEXT, variety_id TEXT,grower_id TEXT, FOREIGN KEY(crop_id)  REFERENCES crop(crop_id),FOREIGN KEY(variety_id)  REFERENCES variety(variety_id),FOREIGN KEY(grower_id) REFERENCES growers(grower_id))',
    [],
    () => {
      console.log('Farms table created successfully');
    },
    (error) => {
      console.error('Failed to create table:', error);
    }
  );
});

// db.transaction((tx) => {
//   tx.executeSql(
//     'DROP TABLE inspection_images',
//     [],
//     () => {
//       console.log('drop');
//     },
//     (error) => {
//       console.error('Failed to create table:', error);
//     }
//   );
// });

db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS inspection (inspection_id TEXT PRIMARY KEY NOT NULL,inspection_date date, inspection_time time,farm_id TEXT,user_id TEXT,inspection_type text,isolation_distance TEXT(100),planting_pattern TEXT,off_type_percentage number,pest_disease_incidence number,defective_plants number,pollinating_females_percentage number,female_receptive_skills number,male_elemination number, off_typecobs_at_shelling number,defective_cobs_at_shelling number,inspection_remarks TEXT,FOREIGN KEY(farm_id) REFERENCES farms(farm_id),FOREIGN KEY(user_id) REFERENCES users(id))',
    [],
    () => {
      console.log('Inspection table created successfully');
    },
    (error) => {
      console.error('Failed to create table:', error);
    }
  );
});



db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS geo_location (inspection_id TEXT ,latitude TEXT, longitude TEXT,altitude TEXT,accuracy TEXT,speed TEXT,FOREIGN KEY(inspection_id) REFERENCES inspection(inspection_id))',
    [],
    () => {
      console.log('geo_location table created successfully');
    },
    (error) => {
      console.error('Failed to create table:', error);
    }
  );
});


db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS inspection_images(image_uri TEXT PRIMARY KEY NOT NULL, inspection_id TEXT,FOREIGN KEY(inspection_id) REFERENCES inspection(inspection_id))',
    [],
    () => {
      console.log('Images table created');
    },
    (error) => {
      console.error('Failed to create table:', error);
    }
  );
});





export default db



