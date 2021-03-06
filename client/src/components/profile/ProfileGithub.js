import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGithubRepos } from '../../redux/actions/profileActions';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username }) => {
	const dispatch = useDispatch();
	const profileState = useSelector((state) => state.profile);
	const { isLoading, repos } = profileState;
	useEffect(() => {
		dispatch(fetchGithubRepos({ username }));
	}, [dispatch, username]);
	const getAbsoluteUrl = (str) => {
		if (!str.startsWith('https')) {
			return `http://${str}`;
		}
		return str;
	};
	return (
		<div className='profile-github'>
			<h2 className='text-primary my-1'>
				<i className='fab fa-github'></i> Github Repos
			</h2>
			{isLoading && repos === null ? (
				<Spinner />
			) : (
				repos.map((repo) => (
					<div key={repo.id} className='repo bg-white my-1 p-1'>
						<div>
							<h4>
								<a
									href={repo.html_url}
									target='_blank'
									rel='noopener noreferrer'
								>
									{repo.name}
								</a>{' '}
								{repo.homepage && (
									<a
										href={getAbsoluteUrl(repo.homepage)}
										target='_blank'
										rel='noopener noreferrer'
									>
										<i className='fa fa-external-link'></i>
									</a>
								)}
							</h4>
							<p>{repo.description}</p>
						</div>
						<div>
							<ul>
								<li className='badge badge-primary'>
									Stars: {repo.stargazers_count}
								</li>
								<li className='badge badge-dark'>
									Watchers: {repo.watchers_count}
								</li>
								<li className='badge badge-light'>Forks: {repo.forks_count}</li>
							</ul>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default ProfileGithub;
