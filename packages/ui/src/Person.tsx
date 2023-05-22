export function Person({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui-flex ui-items-center ui-leading-tight ui-space-x-3">
      {children}
    </div>
  );
}

export function PersonImage({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui-rounded-full ui-overflow-clip ui-w-14 ui-h-14">
      {children}
    </div>
  );
}

export function PersonBio({ name, role }: { name: string; role: string }) {
  return (
    <p>
      <span className="ui-font-semibold">{name}</span> <br />
      {role}
    </p>
  );
}
