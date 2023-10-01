import axios from "axios"

export default function Home({ commits }) {
  return (
    <div className='backgroundContainer'>
      <div className='container'>
        <h1 className='font-serif'>
          Historial de Commits <br /> By: Jair Merlo
        </h1>
        <div className='ulContainer'>
          <ul>
            {commits.map((commit) => (
              <li key={commit.sha}>{commit.commit.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const githubAccessToken = "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"
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
