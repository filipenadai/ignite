import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/Auth"
import { useCan } from "../hooks/useCan"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  const userCanMetrics = useCan({
    permissions: ['metrics.list']
  })

  useEffect(() => {
    api.get('me').then(response => {
    })
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
      {userCanMetrics && <p>metricas</p>}
      <button onClick={signOut}>SignOut</button>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/me');

  return {
    props: {}
  }
});
