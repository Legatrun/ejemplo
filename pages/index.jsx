import axios from "axios"

export default function Home({ commits }) {
  return (
    <div>
      <h1>Historial de Commits</h1>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>{commit.commit.message}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps() {
  const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN
  const owner = "jairmerlo"
  const repo = "ejemplo"

  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        Authorization: `token ${githubAccessToken}`
      }
    })

    const commits = response.data

    return {
      props: { commits }
    }
  } catch (error) {
    console.error("Error al obtener el historial de commits", error)
    return {
      props: { commits: [] }
    }
  }
}
