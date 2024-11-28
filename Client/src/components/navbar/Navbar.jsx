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
  IconCirclePlus,
} from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./navbar.css";
import { useDisclosure } from "@mantine/hooks";
import CreateProduct from "../Product/CreateProduct";
export default function Navbar({ cart, setProducts, query, setQuery }) {
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
      {location.pathname == `/login` && (
        <>
          <h3>Please enter you Email and Password</h3>
          <p></p>
        </>
      )}
      {location.pathname !== `/login` && (
        <div id="navbar-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search"
            type="search"
            placeholder="Search for a product..."
          />
        </div>
      )}
      {isLoggedIn && (
        <>
          <Group>
            {location.pathname === `/user/products/${user._id}` && (
              <>
                <Modal opened={opened} onClose={close} title="Create Product">
                  <CreateProduct close={close} setProducts={setProducts} />
                </Modal>

                <IconCirclePlus
                  stroke={1}
                  size={30}
                  color="#2c2c2c"
                  onClick={open}
                  className="clickable plus"
                />
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

      {!isLoggedIn && location.pathname !== `/login` && (
        <Group>
          <Link to="/login">
            <Button>Login</Button>{" "}
          </Link>
        </Group>
      )}
    </nav>
  );
}
