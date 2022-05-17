// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Images
import logoCT from '../../images/logo-ct-dark.png';
// Material Kit 2 React components
import MKTypography from './components/MKTypography';

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Epic Car Rental",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "/1",
    },
    {
      icon: <TwitterIcon />,
      link: "/2",
    },
    {
      icon: <GitHubIcon />,
      link: "/3",
    },
    {
      icon: <YouTubeIcon />,
      link: "/4",
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "example ", href: `/` },
      ],
    },
    {
      name: "resources",
      items: [
        { name: "example ", href: `/` },
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "example ", href: `/` },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "example ", href: `/` },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Epic Car Rental 
      {/* <MKTypography
        component="a"
        href="/"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        
      </MKTypography> */}
      .
    </MKTypography>
  ),
};
