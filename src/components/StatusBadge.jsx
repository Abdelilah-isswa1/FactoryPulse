import { STATUS_CLASS } from "../constants/status.js";

export default function StatusBadge({ status }) {
  return <span className={`badge ${STATUS_CLASS[status]}`}>{status}</span>;
}
