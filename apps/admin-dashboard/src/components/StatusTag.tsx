export const StatusTag = ({ s }: { s: string }) => {
  return <span className={`tag ${s.toLowerCase()}`}>{s}</span>;
};
