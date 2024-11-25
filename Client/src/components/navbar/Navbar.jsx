import "@mantine/core";
import { Avatar, Menu, Group, Button, Modal } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IconShoppingCart,
  IconSearch,
  IconLogout,
  IconSettings,
  IconBox,
  IconMessage,
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
        src="../../public/Logo.png"
        alt="site Logo"
        className="logo"
        onClick={() => {
          navigate("");
        }}
      />

      <div id="navbar-search">
        <IconSearch className="search-icon" size={18} color="#5c5656" />
        <input type="search" placeholder=" Find for a product..." />
      </div>

      {isLoggedIn && (
        <>
          {location.pathname === `/user/products/${user._id}` && (
            <>
              <Modal opened={opened} onClose={close} title="Create Product">
                <CreateProduct />
              </Modal>
              <Button onClick={open}>Create New Product</Button>
            </>
          )}
          <Group>
            <IconShoppingCart size={30} />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar alt="it's me" src={null || user.image} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>{user.name}</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconBox style={{ width: rem(14), height: rem(14) }} />
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
        <>
          <Link to="/signup">
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}
