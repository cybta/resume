let fallback = 'data/data-en.json';
const app = document.getElementById('app');

function getQueryParam(param) {
  // Create a URL object from the current window location
  const url = new URL(window.location.href);

  // Get the query parameter value
  const value = url.searchParams.get(param);

  // Return the value if found, otherwise return the fallback value
  return value !== null ? value : 'en';
}

async function fetchData(url) {
  if (typeof url !== 'string') {
    throw new Error('The URL parameter must be a string.');
  }

  if (!url) {
    throw new Error('The URL parameter cannot be empty.');
  }

  try {
    const response = await fetch(url);

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Attempt to parse the response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error.message);

    // Attempt to fetch the fallback URL if the initial URL fails
    try {
      const fallbackUrl = 'data/data-en.json';
      const response = await fetch(fallbackUrl);

      if (!response.ok) {
        throw new Error(`Fallback HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (fallbackError) {
      console.error('Fallback fetch error:', fallbackError.message);
      throw fallbackError; // Re-throw the fallback error if it fails
    }
  }
}

const init = async function () {
  const getLang = getQueryParam('lang');
  const api = `data/data-${getLang}.json`;

  const data = await fetchData(api);
  console.log(data);

  const basicData = data.basicData;
  const whoIam = basicData.whoIam;
  const education = basicData.education;

  const mainData = data.mainData;

  const summary = mainData.summary;
  const objectives = mainData.objectives;
  const skills = mainData.skills;
  const experience = mainData.experience;
  const whyMe = mainData.whyMe;

  const returnList = (arrayOfStrings, tag) => {
    let htmlValue = '';

    arrayOfStrings.map((el) => {
      htmlValue += `
				<${tag}>${el}</${tag}>
			`;
    });

    return htmlValue;
  };

  const renderStars = () => {
    let singstar = '<span class="icon-star"></span>';
    let multystars = '';

    for (var i = 0; i < 5; i++) {
      multystars += singstar;
    }

    return multystars;
  };

  const returnSkills = () => {
    let htmlValue = '';

    skills.list.map((el) => {
      htmlValue += `
				<div class="colw-33 res-s-100" data-lvl="${el.lvl}" data-evo="${el.state}">
					<div class="flex ai-c jc-sb pad-15">
						<div>${el.name}</div>
						<div class="stars">
							${renderStars()}
						</div>
					</div>
				</div>
			`;
    });

    return htmlValue;
  };

  const renderJobsList = (arrayOfExperiences) => {
    let htmlValue = '';

    console.log(arrayOfExperiences);

    arrayOfExperiences.map((el) => {
      const responsibilities = returnList(el.responsibilities, 'div');

      htmlValue += `
				<li id="${el.id}">
					<div class="jobtitle txt-edit">
						<h5 class="lato">${el.time}</h5>
						<div>${el.position}</div>
						<div>(${el.company})</div>
					</div>
					<div class="jobdesc" data-acc="job1">
						<div>
							<h5 class="title">
								${experience.responsibilitiesTitle}
							</h5>

							${responsibilities}

							<h5 class="title mt-25">${experience.achievementsTitle}</h5>
							<div>${el.achievements}</div>
						</div>
					</div>
				</li>
			`;
    });

    return htmlValue;
  };

  app.innerHTML = `
		<div class="colw-33 res-s-100 photobg pad-35">
        <div class="flex jc-sb fd-c fh">
          <div class="colw-100">
            <h1><strong>${basicData.name}</strong></h1>
            <div class="row">${basicData.title}</div>
          </div>
          <div class="colw-100">
            <h2 class="title">
              <strong>${whoIam.title}</strong>
            </h2>

            <div class="txt-edit">
              ${whoIam.gender.title}:
							${whoIam.gender.value} <br />

							${whoIam.dob.title}:
							${whoIam.dob.value} <br />

							${whoIam.email.title}:
							<a href="mailto:${whoIam.email.value}">${whoIam.email.value}</a> <br />

							${whoIam.mobile.title}:
							<a href="tel:${whoIam.email.call}">${whoIam.mobile.value}</a> <br />

							${whoIam.address.title}:
							${whoIam.address.value}<br />
            </div>
          </div>

          <div class="colw-100">
            <h2 class="title">
              <strong>${education.title}</strong>
            </h2>

            <div class="txt-edit">
              ${returnList(education.diploma, 'h6')}
							<ul>${returnList(education.languages, 'li')}</ul>
            </div>
          </div>
        </div>
      </div>

			<!-- MAIN DATA GOES HERE -->
			<div class="colw-66 res-s-100">
        <div class="row pad-35 summary">
          <h2 class="title">
            <strong>${summary.title}</strong>
          </h2>
          <div class="row">${summary.data}</div>
        </div>

        <div class="row pad-35 objectives">
					<h2 class="title">
            <strong>${objectives.title}</strong>
          </h2>
          <div class="row">${objectives.data}</div>
        </div>
        <div class="flex fd-c">
          <div class="skills pad-35">
            <h2 class="title">
              <strong>${skills.title}</strong>
            </h2>
            <div class="row flex skillslist fw-w" data-spacing="1">
              ${returnSkills()}
            </div>
          </div>

          <div>
            <div class="flex fh ai-s mb-35">
              <div class="colw-50 res-s-100 pad-35 exp">
                <h2 class="title">
                  <strong>${experience.title}</strong>
                </h2>

                <div class="accordion">
                  <ul>
                    ${renderJobsList(experience.list)}
                  </ul>
                </div>
              </div>

              <div class="colw-50 res-s-100 pad-35 cl">
                <h2 class="title">
                  <strong>${whyMe.title}</strong>
                </h2>

                <div class="row" data-spacing="20">
                  <div class="colw-100">
                    <div class="txt-edit smaller">
                      ${whyMe.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
	`;

  //ACCORDION STARTS HERE
  const accordion = document.querySelector('.accordion');
  const items = accordion.querySelectorAll('li');
  const jobtitle = accordion.querySelectorAll('.jobtitle');

  //Lets figure out what item to click
  function toggleAccordion() {
    const thisItem = this.parentNode;

    items.forEach((item) => {
      if (thisItem == item) {
        thisItem.classList.toggle('open');
        return;
      }

      item.classList.remove('open');
    });
  }

  jobtitle.forEach((question) =>
    question.addEventListener('click', toggleAccordion)
  );
};

init();
