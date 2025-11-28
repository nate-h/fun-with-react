/**
 * This is a simple problem that exercises an online json-based endpoint and throws
 * it in a table. It uses axios to fetch the data.
 *
 * This goal is to show some data in the table which is a tad-bit of a challenge
 * given the nesting involved with the json
 */

import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../Card';
import './UserTable.scss';

const DATA_URL = 'https://randomuser.me/api/?results=10';

interface User {
  name: string;
  email: string;
  address: string; // formatted as street city postcode country
}

const fetchData = (url: string) => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return null;
    });
};

const UserRow = ({ user }: { user: User }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
    </tr>
  );
};

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchData(DATA_URL).then((data) => {
      const newUsers: User[] = [];
      for (const tempUser of data.results) {
        const loc = tempUser.location;
        const street = tempUser.location.street;
        newUsers.push({
          name: `${tempUser.name.first} ${tempUser.name.last}`,
          email: tempUser.email,
          address: `${street.number} ${street.name} ${loc.city} ${loc.postcode} ${loc.country}`,
        });
      }
      setUsers(newUsers);
    });
  }, []);

  return (
    <Card header='UserTable' id='UserTable'>
      <section>
        <br />
        <h2>Fetches data from a website using axios.</h2>
        <br />
        <table className={'user-table'}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Address</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow user={user} key={user.email} />
            ))}
          </tbody>
        </table>
      </section>
    </Card>
  );
}
