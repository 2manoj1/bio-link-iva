import { redirect } from 'next/navigation';

// Sanity owns editor authentication and project permissions.
export default function AdminPage() {
  redirect('/studio');
}
