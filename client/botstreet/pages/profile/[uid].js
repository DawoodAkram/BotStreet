import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import cookie from 'cookie';

const Profile = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-2 lg:col-span-2 border-r border-gray-200 dark:border-gray-800">
          <Sidebar />
        </div>

        <div className="md:col-span-10 lg:col-span-10 p-4 pt-12">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Profile</h1>
          {user && (
            <div className="mt-4 p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-700 dark:text-white">Username:</span>
                <p className="text-gray-500 dark:text-gray-400">{user.username}</p>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-lg text-gray-700 dark:text-white">UserID:</span>
                <p className="text-gray-500 dark:text-gray-400">{user.userId}</p>
              </div>
              <div>
                <span className="font-semibold text-lg text-gray-700 dark:text-white">Email:</span>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;


export async function getServerSideProps(context) {
  const { uid } = context.params;
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookie.parse(cookies || '');
  const token = parsedCookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  try {
    const res = await fetch(`http://localhost:3000/api/auth/profile/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (errorData.error === 'jwt expired') {
        return {
          redirect: {
            destination: '/signin',
            permanent: false,
          },
        };
      } else {
        throw new Error(errorData.error);
      }
    }

    const data = await res.json();

    return {
      props: {
        user: data,
      },
    };
  } catch (err) {
    console.error('Error fetching user:', err.message);
    return {
      notFound: true,
    };
  }
}
