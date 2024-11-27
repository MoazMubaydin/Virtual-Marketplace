import "@mantine/core";
import { Avatar, Menu, Group, Button, Modal } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IconShoppingBag,
  IconSearch,
  IconLogout,
  IconSettings,
  IconBox,
  IconMessage,
  IconCirclePlusFilled,
} from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./navbar.css";
import { useDisclosure } from "@mantine/hooks";
import CreateProduct from "../Product/CreateProduct";
export default function Navbar({ cart }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="navbar">
      <img
        src="../../public/Logo.svg"
        alt="site Logo"
        className="logo clickable"
        onClick={() => {
          navigate("");
        }}
      />

      <div id="navbar-search">
        <input
          className="search"
          type="search"
          placeholder="Search for a product..."
        />
      </div>

      {isLoggedIn && (
        <>
          <Group>
            {location.pathname === `/user/products/${user._id}` && (
              <>
                <Modal opened={opened} onClose={close} title="Create Product">
                  <CreateProduct close={close} />
                </Modal>
                <Button onClick={open} variant="transparent" color="white">
                  <IconCirclePlusFilled />
                </Button>
              </>
            )}
            <IconShoppingBag
              className="clickable"
              size={30}
              stroke={1}
              color="#2c2c2c"
              cart={cart}
              onClick={() => navigate(`/user/shopping-cart/${user._id}`)}
            />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar
                  alt={user.name}
                  src={null || user.image}
                  className="clickable"
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>{user.name}</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconBox
                      style={{ width: rem(14), height: rem(14) }}
                      alt="shopping cart"
                    />
                  }
                  onClick={() => {
                    navigate(`/user/products/${user._id}`);
                  }}
                >
                  My Products
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconMessage style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Messages
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Account Setting
                </Menu.Item>

                <Menu.Item
                  onClick={logOutUser}
                  color="red"
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </>
      )}

      {!isLoggedIn && (
        <Group>
          <Link to="/signup">
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            <button>Login</button>{" "}
          </Link>
        </Group>
      )}
    </nav>
  );
}
