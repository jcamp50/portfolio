import React from 'react';
import GitHubCalendar, { Props } from 'react-github-calendar';
import GitHubButton from 'react-github-btn';

let username = 'jcamp50';

const selectLastHalfYear: Props['transformData'] = (contributions) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = 6;

  return contributions.filter((activity) => {
    const date = new Date(activity.date);
    const monthOfDay = date.getMonth();

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - shownMonths &&
      monthOfDay <= currentMonth
    );
  });
};

const GithubContributions = () => {
  return (
    <section className='py-8'>
      <div className='flex flex-col items-center justify-center mb-4'>
        <GitHubButton
          href={`https://github.com/${username}`}
          data-color-scheme='no-preference: light; light: light; dark: dark;'
          data-icon='octicon-icon'
          data-size='large'
          data-show-count='false'
          aria-label="View jcamp50's profile on GitHub"
        >
          jcamp50
        </GitHubButton>

        <div className='overflow-x-auto md:hidden'>
          <GitHubCalendar
            username={username}
            transformData={selectLastHalfYear}
            fontSize={12}
            blockSize={18}
            labels={{
              totalCount: '{{count}} contributions in the last half year',
            }}
          />
        </div>
        <div className='overflow-x-auto hidden md:block'>
          <GitHubCalendar username={username} fontSize={22} blockSize={18} />
        </div>
      </div>
    </section>
  );
};

export default GithubContributions;
