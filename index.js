import { Octokit } from "@octokit/rest"
import { config } from "dotenv"

config()

const auth = process.env.GITHUB_TOKEN
const octokit = new Octokit({ auth })

async function getPullRequests(
  owner,
  repo,
) {
  const { data } = await octokit.pulls.list({
    owner,
    repo,
    state: "open"
  })

  const today = new Date()

  const pull_requests = data.map((pull) => {
    return {
      repo,
      owner,
      number: pull.number,
      title: pull.title,
      base_branch: pull.base.ref,
      head_branch: pull.head.ref,
      user: pull.user.login,
      created_at: pull.created_at,
    }
  })

  return pull_requests
    .filter((pull) => {
    const created_at = new Date(pull.created_at)
    return today.getDate() === created_at.getDate()
  })
}

async function approvePullRequest(
  owner,
  repo,
  pull_number,
) {
  const { data } = await octokit.pulls.createReview({
    owner,
    repo,
    pull_number,
    event: "APPROVE"
  })

  return data
}

async function main() {
  const repos = [
    {
      owner: "user_name",
      repo: "repository_name1"
    },
    {
      owner: "user_name",
      repo: "repository_name2"
    },
    {
      owner: "user_name",
      repo: "repository_name3"
    }
  ]

  const pull_requests = await Promise.all(
    repos.map((repo) => getPullRequests(repo.owner, repo.repo))
  )

  const pull_requests_flat = pull_requests.flat()

  const response = await Promise.all(
    pull_requests_flat.map((pull) => {
      return approvePullRequest(
        pull.owner,
        pull.repo,
        pull.number
      )
    })
  )

  const response_flat = response.flat()

  if (response_flat.length > 0) console.table(response_flat)
  else console.log("No pull requests to approve")
}

main()
