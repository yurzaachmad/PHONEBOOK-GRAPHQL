import UserList from "./PhoneList";

export default function UserBox({
  contact,
  q,
  setQ,
  searchParam,
  sortTypes,
  currenSort,
}) {
  return (
    <div>
      <UserList
        listPhone={contact}
        q={q}
        setQ={setQ}
        searchParam={searchParam}
        sortTypes={sortTypes}
        currenSort={currenSort}
      />
    </div>
  );
}
