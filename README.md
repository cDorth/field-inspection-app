# Field Inspection App
<h3>Overview</h3>
<p>FieldInspection is a mobile application designed for field inspection tasks. It enables users to collect data while working offline using a SQLite database. The collected data can later be synchronized with the Seed Tracking API when an internet connection is available.</p>

<h3>Features<h3>
<h5>Offline Data Collection: </h5> * Field inspectors can perform their tasks and collect inspection data even in areas with no internet connectivity. The app utilizes a local SQLite database to store the collected data.

<h5>Data Synchronization:</h5> * When the user is back online, the app allows them to synchronize the collected data with the Seed Tracking API. This ensures that all data is securely stored and accessible from the central database.

<h5>Field Inspection Forms:</h5> * The app provides customizable field inspection forms tailored to specific tasks. Inspectors can fill out the forms with relevant information during their inspections.

<h5>Photo Capture:</h5> * Field inspectors can capture photos directly from within the app and associate them with inspection records. Photos serve as visual evidence and aid in documentation.

<h5>GPS Location Tracking:</h5> * The app records the GPS location of each inspection, providing precise location data for the fieldwork.

<h5>Offline Data Storage: </h5> * All collected data is stored securely in the local SQLite database, ensuring that inspection records are not lost, even when there is no internet connection.

<h5>User Authentication: </h5> * To ensure data security, the app requires user authentication for accessing and modifying inspection data. Each user has specific access permissions based on their role.

<h5>Data Export and Reporting: </h5> * Users can export inspection data in various formats (e.g., CSV, Excel) and generate reports for further analysis and reporting.

<h3>Technologies Used <h3>
<h5>React Native:</h5> * The app is built using React Native, a popular JavaScript framework for building cross-platform mobile applications.

<h5>SQLite Database:</h5> * The app utilizes SQLite, a lightweight and embedded database, to store the inspection data locally on the mobile device.

<h5>Seed Tracking API:</h5> * The app communicates with the Seed Tracking API to synchronize the collected data with the central database.

<h5>Redux:</h5> * Redux is used for state management, ensuring a consistent and predictable data flow throughout the app.

<h5>React Navigation: </h5> * React Navigation handles navigation and routing within the app, providing a smooth user experience.

<h5>Camera API:</h5> * The Camera API is used to enable photo capture directly from the app.

<h5>Geolocation API:</h5> * The Geolocation API is used to track and record GPS location data during inspections.

<h5>User Authentication System:</h5> * The app implements a user authentication system to manage user access and data security.

<h3>Getting Started</h3>
Follow these steps to get started with the FieldInspection app:

Clone the repository:


1.
bash....
git clone https://github.com/soza-wilson/FieldInspection.git
cd field-inspection-app
Install dependencies:

2.
bash...
npm install
Start the app on your development environment:

3.
bash...
npm run start
Connect your mobile device or use an emulator to run the app on iOS or Android.

Begin field inspections and data collection.

<h3>Contributing</h3>
We welcome contributions to the FieldInspection app. If you find any bugs or have ideas for improvements, feel free to open an issue or submit a pull request.

License MIT
EM CASO DE ERRO: CODIGO DO database.tsx

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




